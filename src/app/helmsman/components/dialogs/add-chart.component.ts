import { Component, Inject, Optional } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Project, ProjectChart } from "../../models/project";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'app-add-chart-dialog',
    templateUrl: './add-chart.component.html',
    styleUrls: ['./add-chart.component.css']
})
export class AddChartDlgComponent {

    galaxyCtrl = new FormControl('');
    jupyterCtrl = new FormControl('');

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) private installedCharts: ProjectChart[]) {
        if (this.installedCharts) {
            for (let chart of this.installedCharts) {
                if (chart.name == 'galaxy')
                    this.galaxyCtrl.setValue(true);
                else if (chart.name == 'jupyterhub')
                    this.jupyterCtrl.setValue(true);
            }
        }
    }

    getCharts() : any {
        return {
            "galaxy": this.galaxyCtrl.value,
            "jupyterhub": this.jupyterCtrl.value
        };
    }

}
