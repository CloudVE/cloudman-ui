import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UntypedFormControl} from "@angular/forms";
import {Observable} from 'rxjs';

import {ChartReconfigurationDlgComponent} from '../dialogs/chart-reconfiguration.component';
import {CreateProjectDlgComponent} from '../dialogs/create-project.component';
import {ProjManService} from "../../services/projman.service";
import {Project} from "../../models/project";
import {ProjectChart} from "../../models/project";

import {forkJoin, interval, Subject, of, concat, throwError} from "rxjs";
import {flatMap, startWith, switchMap, tap, retryWhen, delay, take, concat as concat_op} from 'rxjs/operators';
import {AddChartDlgComponent} from "../dialogs/add-chart.component";
import {LoginService} from "../../../login/services/login/login.service";

@Component({
    selector: 'app-chart-management',
    templateUrl: './chart-management.component.html',
    styleUrls: ['./chart-management.component.css']
})
export class ChartManagementComponent implements OnInit {
    displayedColumns = ['name', 'access_address', 'updated', 'actions'];
    projectsObs: Observable<Project[]>;
    chartObs: Observable<ProjectChart[]>;

    // TODO: Temp hack to track installed charts
    installedCharts: ProjectChart[];

    // Form controls
    projectsChanged = new Subject();
    activeProjectChanged = new Subject<Project>();
    projectCtrl = new UntypedFormControl('');

    constructor(public loginService: LoginService,
                private dialog: MatDialog,
                private _projectService: ProjManService) {}

    ngOnInit() {
        this.projectsObs = this.projectsChanged.pipe(
            startWith(null as ProjectChart),
            switchMap(() => this._projectService.getProjects()),
            tap(projects => {
                if (projects && projects.length && !this.projectCtrl.value) {
                    this.projectCtrl.setValue(projects[0]);
                }
            }));
        this.chartObs = this.activeProjectChanged.pipe(
            switchMap(project => this._projectService.getProjectCharts(project)),
            tap(charts => this.installedCharts = charts),
            flatMap(charts => {
                    const initial_health = forkJoin(charts.map(chart => this._projectService.getChartHealth(
                        chart, this.getAppURL(chart.values)).pipe(
                            // https://stackoverflow.com/a/44911567
                            retryWhen(errors =>
                                // Delay the retry
                                errors.pipe(
                                    delay(5000),
                                    // Retry a max of 5 minutes
                                    take(60),
                                    concat_op(throwError("Exceeded time limit for app readiness"))
                                )
                            )
                        )
                    ));
                    // Rerun the initial health check periodically
                    const periodic_health = interval(5000*60).pipe(
                        startWith(0),
                        flatMap(() => initial_health));
                    return concat(of(charts), periodic_health);
                }
            )
        );
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
            { data: this.installedCharts || [] });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'save') {
                let chartChanges = dialogRef.componentInstance.getChartChanges();
                for (var change of chartChanges) {
                    if (change.action == true) {
                        let newChart = new ProjectChart();
                        newChart.use_install_template = change.install_template.name;
                        newChart.project = this.projectCtrl.value;
                        this._projectService.createProjectChart(newChart)
                            .subscribe(proj => {
                                this.activeProjectChanged.next(this.projectCtrl.value);
                            });
                    } else if (change.action == false) {
                        let oldChart = new ProjectChart();
                        if (change.chart) {
                            oldChart.id = change.chart.id;
                            oldChart.project = this.projectCtrl.value;
                            this._projectService.deleteProjectChart(oldChart)
                                .subscribe(proj => {
                                    this.activeProjectChanged.next(this.projectCtrl.value);
                                });
                        }
                    }
                }
            }
        });
    }

    getAppURL(values) {
        if (values && values['ingress']) {
            if (values['ingress']['access_path']) {
                // FIXME: Should not be directly accessing DOM elements
                return `${window.location.origin}${values['ingress']['access_path']}`;
            }
            else if (values['ingress']['path']) {
                // FIXME: Should not be directly accessing DOM elements
                return `${window.location.origin}${values['ingress']['path']}`;
            }
            else if (values['ingress']['hosts'] && values['ingress']['hosts'][0]['paths']) {
                return `${window.location.origin}${values['ingress']['hosts'][0]['paths'][0]}`;
            }
        }
        return "";
    }

    compareProjectIds(p1: Project, p2: Project) {
        return (!p1 && !p2) || (p1.id == p2.id);
    }

    getGrafanaUrl(element) {
        return `/grafana/d/gxy_general_stats_${element.id}/galaxy-overview?refresh=120s&orgId=1&kiosk&var-Node=All&theme=light`;
    }

    trackByChartId(idx: number, chart: ProjectChart) {
        return chart.id;
    }
}
