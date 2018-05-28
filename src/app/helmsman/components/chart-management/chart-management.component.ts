import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ChartReconfigurationDlgComponent } from '../dialogs/chart-reconfiguration.component';


export interface ChartDefinition {
  name: string;
  access_address: string;
}

const ELEMENT_DATA: ChartDefinition[] = [
  {name: 'Galaxy', access_address: '<cluster_ip>/galaxy'}
];


@Component({
    selector: 'app-chart-management',
    templateUrl: './chart-management.component.html',
    styleUrls: ['./chart-management.component.css']
})
export class ChartManagementComponent {
    displayedColumns = ['name', 'access_address', 'actions'];
    dataSource = ELEMENT_DATA;

    constructor(private dialog: MatDialog) {}

    openChartReconfigurationDialog(chart: ChartDefinition) {
        const dialogRef = this.dialog.open(ChartReconfigurationDlgComponent,
                { width: '500px' });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'delete') {
            } else if (result === 'archive') {
            }
        });
    }

}
