import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Chart } from '../../models/chart';
import { HelmsManService } from '../../services/helmsman.service';

import { ChartReconfigurationDlgComponent } from '../dialogs/chart-reconfiguration.component';


@Component({
    selector: 'app-chart-management',
    templateUrl: './chart-management.component.html',
    styleUrls: ['./chart-management.component.css']
})
export class ChartManagementComponent {
    displayedColumns = ['name', 'access_address', 'actions'];
    charts: Observable<Chart[]>;

    constructor(private dialog: MatDialog, private _helmsmanService: HelmsManService) {}

    ngOnInit() {
        this.charts = this._helmsmanService.getInstalledCharts();
    }

    openChartReconfigurationDialog(chart: Chart) {
        const dialogRef = this.dialog.open(ChartReconfigurationDlgComponent,
                                           { data: chart });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'save') {
                let clonedChart = Object.assign({}, chart)
                clonedChart.config = dialogRef.componentInstance.getChanges();
                this._helmsmanService.updateInstalledChart(clonedChart)
                    .subscribe(updatedChart => chart.config = updatedChart.config);
            }
        });
    }

    getAppURL(relPath) {
        // FIXME: Should not be directly accessing DOM elements
        return window.location.origin + relPath;
    }
}
