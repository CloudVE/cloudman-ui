import { Component, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NgSwitch, NgSwitchDefault } from '@angular/common';

import { Chart } from '../../models/chart';

@Component({
    selector: 'app-chart-reconfiguration-dialog',
    templateUrl: './chart-reconfiguration.component.html',
    styleUrls: ['./chart-reconfiguration.component.css']
})
export class ChartReconfigurationDlgComponent {

    config: any = {};
    initialFrozenConfig: any;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: Chart) {
        this.config = data.config;
        this.initialFrozenConfig = JSON.parse(JSON.stringify(this.config));
    }

    public get galaxyYaml() {
        return this.config['galaxy.yml'];
    }

    public set galaxyYaml(value) {
        this.config['galaxy.yml'] = value;
    }

    public get jobConf() {
        return this.config['job_conf.xml'];
    }

    public set jobConf(value) {
        this.config['job_conf.xml'] = value;
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
        return this.getObjDiff(this.initialFrozenConfig, this.config);
    }
}
