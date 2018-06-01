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

    jsonFormOptions: any = {
            addSubmit: false, // Add a submit button if layout does not have one
            debug: false, // Don't show inline debugging information
            loadExternalAssets: false, // Load external css and JavaScript for frameworks
            returnEmptyFields: false, // Don't return values for empty input fields
            setSchemaDefaults: true, // Always use schema defaults for empty fields
            defautWidgetOptions: { feedback: true }, // Show inline feedback icons
          };

    jsonSchema: any;
    configData: any = {};
    initialFrozenConfig: any;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: Chart) {
        this.jsonSchema = data.schema;
        this.configData = data.config;
    }

    trackChanges(event: any) {
        // A bit of a hack to get track changes working. Initially, the configData
        // will contain whatever values the user has set. However, angular2-json-schema
        // will update that configData with the schema's default values, resulting in a dict
        // containing configData + defaults. Therefore, to get the final list of user-edited
        // values, we should diff the final set of values against those initial
        // values (configData + defaults). So we store this initial dict here.
        if (!this.initialFrozenConfig) {
            this.initialFrozenConfig = event;
        }
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
        return this.getObjDiff(this.initialFrozenConfig, this.configData);
    }
}
