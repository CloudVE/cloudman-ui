import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NodeAddDlgComponent } from '../dialogs/node-add.component';


@Component({
    selector: 'app-cluster-management',
    templateUrl: './cluster-management.component.html',
    styleUrls: ['./cluster-management.component.css']
})
export class ClusterManagementComponent {

    constructor(private dialog: MatDialog) {}

    openAddNodeDialog(obj: any) {
        const dialogRef = this.dialog.open(NodeAddDlgComponent,
                                           { data: obj });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'save') {

            }
        });
    }
}
