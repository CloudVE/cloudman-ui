import { Component, Inject, Optional } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { ProjectChart } from "../../models/project";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { HelmsManService } from "../../services/helmsman.service";
import { InstallTemplate } from "../../models/chart";
import { startWith, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-add-chart-dialog',
    templateUrl: './add-chart.component.html',
    styleUrls: ['./add-chart.component.css']
})
export class AddChartDlgComponent {

    installTemplatesObs: Observable<InstallTemplate[]>;

    installTemplateCtrls: UntypedFormArray;

    constructor(private helmsmanService: HelmsManService,
                @Optional() @Inject(MAT_DIALOG_DATA)
                private installedCharts: ProjectChart[]) {
        this.installTemplatesObs = this.helmsmanService.getInstallTemplates().pipe(
            tap(templates => {
                const formGroups = templates.map(
                    tpl => {
                        let chart = this.getMatchingChart(tpl)
                        return new UntypedFormGroup({
                            'install_template': new UntypedFormControl(tpl),
                            'action': new UntypedFormControl(!!chart),
                            'chart': new UntypedFormControl(chart)
                        })
                    });
                this.installTemplateCtrls = new UntypedFormArray(formGroups);
            }));
    }

    getMatchingChart(tpl: InstallTemplate) : ProjectChart {
        return this.installedCharts.find(c => c.name == tpl.chart);
    }

    getChartChanges() : any {
        return this.installTemplateCtrls.value;
    }
}
