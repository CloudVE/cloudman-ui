import { Component, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NgSwitch, NgSwitchDefault } from '@angular/common';


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

    jsonSchemaJson: any;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
        this.jsonSchemaJson = data;
    }

}
