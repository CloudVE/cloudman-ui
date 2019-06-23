import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { ChartReconfigurationDlgComponent } from '../dialogs/chart-reconfiguration.component';
import { CreateProjectDlgComponent } from '../dialogs/create-project.component';
import { ProjManService } from "../../services/projman.service";
import { Project } from "../../models/project";
import { ProjectChart } from "../../models/project";

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
    chartObjs: Observable<ProjectChart[]>;

    // Form controls
    projectChanged = new Subject();
    projectCtrl = new FormControl('');

    constructor(private dialog: MatDialog, private _projectService: ProjManService) {}

    ngOnInit() {
        this.projectsObs = this.projectChanged.pipe(
            startWith(null),
            switchMap(() => this._projectService.getProjects()),
            tap(projects => {
                if (projects && projects.length && !this.projectCtrl.value) {
                    this.projectCtrl.setValue(projects[0]);
                }
            }));
        this.chartObjs = this.projectCtrl.valueChanges.pipe(
            switchMap(project => this._projectService.getProjectCharts(project)));
    }

    rollbackChart(chart: ProjectChart) {
        let clonedChart = Object.assign({}, chart)
        this._projectService.rollbackProjectChart(clonedChart)
                    .subscribe(updatedChart => chart.values = updatedChart.values);
    }

    openChartReconfigurationDialog(chart: ProjectChart) {
        const dialogRef = this.dialog.open(ChartReconfigurationDlgComponent,
                                           { data: chart });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'save') {
                let clonedChart = Object.assign({}, chart)
                clonedChart.values = dialogRef.componentInstance.getChanges();
                this._projectService.updateProjectChart(clonedChart)
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

    compareProjectIds(p1: Project, p2: Project) {
        return (!p1 && !p2) || (p1.id == p2.id);
    }
}
