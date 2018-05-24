import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelmsmanRoutingModule } from './helmsman-routing.module';
import { LayoutModule } from '../shared/layout.module';

import { MatCardModule, MatIconModule, MatTabsModule, MatTableModule } from '@angular/material';

import { ChartManagementComponent } from './components/chart-management/chart-management.component';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    HelmsmanRoutingModule,
    LayoutModule
  ],
  declarations: [ChartManagementComponent],
  exports: [ChartManagementComponent],
})
export class HelmsmanModule { }
