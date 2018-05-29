import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgSwitch, NgSwitchDefault } from '@angular/common';


export interface GalaxyConfig {
  key: string;
  type: string;
  value: any;
}

const ELEMENT_DATA: GalaxyConfig[] = [
  {key: 'admin_users', type: 'str', value: 'admin@galaxyproject.org'},
  {key: 'require_login', type: 'bool', value: false},
  {key: 'show_welcome_with_login', type: 'bool', value: false},
  {key: 'allow_user_creation', type: 'bool', value: true},
  {key: 'allow_user_deletion', type: 'bool', value: true},
  {key: 'allow_user_impersonation', type: 'bool', value: false}
];


@Component({
    selector: 'app-chart-reconfiguration-dialog',
    templateUrl: './chart-reconfiguration.component.html',
})
export class ChartReconfigurationDlgComponent {
    displayedColumns = ['key', 'value'];
    dataSource = ELEMENT_DATA;

    constructor(private dialog: MatDialog) {}

}
