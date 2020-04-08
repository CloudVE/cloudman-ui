import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as yaml from 'js-yaml'

import { Chart } from '../../models/chart';
import { objDeepDiff } from './util/objdiff';


@Component({
    selector: 'app-chart-reconfiguration-dialog',
    templateUrl: './chart-reconfiguration.component.html',
    styleUrls: ['./chart-reconfiguration.component.css']
})
export class ChartReconfigurationDlgComponent {

    configs: any = {};
    initialFrozenConfigs: any;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public chart: Chart) {
        // get a copy of the initial configs
        this.initialFrozenConfigs = JSON.parse(JSON.stringify(chart.values));
        this.configs = this.configsToText(chart.values.configs);
    }

    configsToText(configs: any) {
        let initial_result = {};
        return Object.keys(configs).reduce((result, key) => {
            if (typeof configs[key] === 'string' || configs[key] instanceof String) {
                result[key] = configs[key];
            }
            else if (!configs[key]) {
                result[key] = "";
            }
            else {
                result[key] = yaml.safeDump(configs[key]);
            }
            return result;
            }, initial_result);
    }

    textToConfigs(configs: any) {
        let initial_result = {};
        return Object.keys(configs).reduce((result, key) => {
            // uwsgi.yml is not valid yaml, so we treat it as a string
            if (key.endsWith(".yml") && key !== 'uwsgi.yml')
                result[key] = yaml.safeLoad(configs[key]);
            else
                result[key] = configs[key];
            return result;
            }, initial_result);
    }

    getChanges() {
        // Return difference between initially stored values, and final set of values
        this.chart.values.configs = this.textToConfigs(this.configs);
        return objDeepDiff(this.initialFrozenConfigs, this.chart.values);
    }

    trackByKey(index: number, obj: any): string {
        return obj.key;
    }

    addNewTab() {
        this.configs['unnamed'] = "";
    }

    sortConfigs(a: any, b: any) : number {
        // Sorted in reverse
        let preferred_order = ["tool_conf.xml", "job_conf.xml", "galaxy.yml"];
        return preferred_order.indexOf(b.key) - preferred_order.indexOf(a.key);
    }

    configChanged(oldConfigName: string, newConfigName: string) {
        if (oldConfigName && oldConfigName != newConfigName) {
            let oldValue = this.configs[oldConfigName];
            this.configs[newConfigName] = oldValue;
            delete this.configs[oldConfigName]
        }

    }
}
