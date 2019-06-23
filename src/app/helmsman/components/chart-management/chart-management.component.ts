import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { Chart } from '../../models/chart';
import { HelmsManService } from '../../services/helmsman.service';

import { ChartReconfigurationDlgComponent } from '../dialogs/chart-reconfiguration.component';
import { CreateProjectDlgComponent } from '../dialogs/create-project.component';
import { ProjManService } from "../../services/projman.service";
import { Project } from "../../models/project";

import { Subject } from "rxjs";
import { startWith, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-chart-management',
    templateUrl: './chart-management.component.html',
    styleUrls: ['./chart-management.component.css']
})
export class ChartManagementComponent implements OnInit {
    displayedColumns = ['name', 'access_address', 'updated', 'actions'];
    projectsObs: Observable<Project[]>;
    charts: Observable<Chart[]>;

    // Form controls
    projectChanged = new Subject();
    projectCtrl = new FormControl('');

    constructor(private dialog: MatDialog, private _helmsmanService: HelmsManService,
                private _projectService: ProjManService) {}

    ngOnInit() {
        this.projectsObs = this.projectChanged.pipe(
            startWith(null),
            switchMap(() => this._projectService.getProjects()),
            tap(projects => {
                if (projects && projects.length && !this.projectCtrl.value) {
                    this.projectCtrl.patchValue(projects[0]);
                }
            }));
        this.charts = this._helmsmanService.getInstalledCharts();
    }

    rollbackChart(chart: Chart) {
        let clonedChart = Object.assign({}, chart)
        this._helmsmanService.rollbackChart(clonedChart)
                    .subscribe(updatedChart => chart.values = updatedChart.values);
    }

    openChartReconfigurationDialog(chart: Chart) {
        const dialogRef = this.dialog.open(ChartReconfigurationDlgComponent,
                                           { data: chart });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'save') {
                let clonedChart = Object.assign({}, chart)
                clonedChart.values = dialogRef.componentInstance.getChanges();
                this._helmsmanService.updateInstalledChart(clonedChart)
                    .subscribe(updatedChart => chart.values = updatedChart.values);
            }
        });
    }

    openCreateProjectDialog() {
        const dialogRef = this.dialog.open(CreateProjectDlgComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'save') {
                let project = dialogRef.componentInstance.getProject();
                this._projectService.createProject(project)
                    .subscribe(proj => {
                        this.projectCtrl.patchValue(proj);
                        this.projectChanged.next(null);
                    });
            }
        });
    }

    getAppURL(relPath) {
        // FIXME: Should not be directly accessing DOM elements
        return window.location.origin + relPath;
    }
}
