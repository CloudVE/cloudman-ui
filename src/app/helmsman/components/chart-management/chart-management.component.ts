import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

import { ChartReconfigurationDlgComponent } from '../dialogs/chart-reconfiguration.component';
import { CreateProjectDlgComponent } from '../dialogs/create-project.component';
import { ProjManService } from "../../services/projman.service";
import { Project } from "../../models/project";
import { ProjectChart } from "../../models/project";

import { Subject } from "rxjs";
import { startWith, switchMap, tap } from 'rxjs/operators';
import { AddChartDlgComponent } from "../dialogs/add-chart.component";

@Component({
    selector: 'app-chart-management',
    templateUrl: './chart-management.component.html',
    styleUrls: ['./chart-management.component.css']
})
export class ChartManagementComponent implements OnInit {
    displayedColumns = ['name', 'access_address', 'updated', 'actions'];
    projectsObs: Observable<Project[]>;
    chartObjs: Observable<ProjectChart[]>;

    // TODO: Temp hack to track installed charts
    installedCharts: ProjectChart[];

    // Form controls
    projectsChanged = new Subject();
    activeProjectChanged = new Subject<Project>();
    projectCtrl = new FormControl('');

    constructor(private dialog: MatDialog, private _projectService: ProjManService) {}

    ngOnInit() {
        this.projectsObs = this.projectsChanged.pipe(
            startWith(null),
            switchMap(() => this._projectService.getProjects()),
            tap(projects => {
                if (projects && projects.length && !this.projectCtrl.value) {
                    this.projectCtrl.setValue(projects[0]);
                }
            }));
        this.chartObjs = this.activeProjectChanged.pipe(
            switchMap(project => this._projectService.getProjectCharts(project)),
            tap(charts => this.installedCharts = charts));
        this.projectCtrl.valueChanges.subscribe(
            proj => this.activeProjectChanged.next(proj));
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
                        this.projectsChanged.next(null);
                    });
            }
        });
    }

    openAddChartDialog() {
        const dialogRef = this.dialog.open(AddChartDlgComponent,
            { data: this.installedCharts });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'save') {
                let charts = dialogRef.componentInstance.getCharts();
                if (charts["galaxy"]) {
                    let newChart = new ProjectChart()
                    newChart.name = 'galaxy';
                    newChart.project = this.projectCtrl.value;
                    newChart.values = {
                        'ingress': {
                            'path': `/${this.projectCtrl.value.name}/galaxy`
                        },
                        'persistence': {
                            'storageClass': 'nfs-provisioner'
                        },
                        'postgresql': {
                            'persistence': {
                                'storageClass': 'ebs-provisioner'
                            }
                        }
                    };
                    this._projectService.createProjectChart(newChart)
                        .subscribe(proj => {
                            this.projectsChanged.next(null);
                        });
                }
                if (charts["jupyterhub"]) {
                    let newChart = new ProjectChart()
                    newChart.name = 'jupyterhub';
                    newChart.repo_name = 'jupyterhub';
                    newChart.project = this.projectCtrl.value;
                    newChart.values = {
                        'ingress': {
                            'enabled': true,
                            'path': `/${this.projectCtrl.value.name}/jupyterhub`,
                            'hosts': [
                                null,
                            ]
                        },
                        'hub': {
                            'baseUrl': `/${this.projectCtrl.value.name}/jupyterhub`
                        },
                        'proxy': {
                            'secretToken': 'dummyvaluefornowd5ba12469a356b7a14df426248bceb8fd368dccc2af567644'
                        }
                    };
                    this._projectService.createProjectChart(newChart)
                        .subscribe(proj => {
                            this.activeProjectChanged.next(this.projectCtrl.value);
                        });
                }
            }
        });
    }

    getAppURL(values) {
        if (values && values['ingress'] && values['ingress']['path'])
            // FIXME: Should not be directly accessing DOM elements
            return `${window.location.origin}${values['ingress']['path']}/`;
        else
            return "";
    }

    compareProjectIds(p1: Project, p2: Project) {
        return (!p1 && !p2) || (p1.id == p2.id);
    }
}
