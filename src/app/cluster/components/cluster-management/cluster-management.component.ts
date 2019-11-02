import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NodeAddDlgComponent } from '../dialogs/node-add.component';
import {LoginService} from "../../../login/services/login/login.service";


@Component({
    selector: 'app-cluster-management',
    templateUrl: './cluster-management.component.html',
    styleUrls: ['./cluster-management.component.css']
})
export class ClusterManagementComponent {

    show_animation = true;

    constructor(private dialog: MatDialog, private elementRef: ElementRef,
                private _loginService: LoginService) {}

    openAddNodeDialog(obj: any) {
        const dialogRef = this.dialog.open(NodeAddDlgComponent,
                                           { data: obj });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'save') {

            }
        });
    }

    onGrafanaLoaded(event: any) {
        this.show_animation = false;
    }
}
