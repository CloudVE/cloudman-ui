import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Chart } from '../../models/chart';

@Component({
    selector: 'app-chart-reconfiguration-dialog',
    templateUrl: './chart-reconfiguration.component.html',
    styleUrls: ['./chart-reconfiguration.component.css']
})
export class ChartReconfigurationDlgComponent {

    configs: any = {};
    initialFrozenConfigs: any;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public chart: Chart) {
        this.configs = chart.values.configs;
        this.initialFrozenConfigs = JSON.parse(JSON.stringify(this.configs));
    }

    // based on: https://stackoverflow.com/a/37396358
    getObjDiff(o1, o2) {
        let diff = Object.keys(o2).reduce((diff, key) => {
            if (o1[key] === o2[key]) return diff
            return {
              ...diff,
              [key]: o2[key]
            }
          }, {})
        return diff;
    }

    getChanges() {
        // Return difference between initially stored values, and final set of values
        this.chart.values.config = this.getObjDiff(this.initialFrozenConfigs, this.configs);
        return this.chart.values;
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
