import { Component } from '@angular/core';

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
}
