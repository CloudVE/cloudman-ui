import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelmsmanRoutingModule } from './helmsman-routing.module';
import { LayoutModule } from '../shared/layout.module';

import { MatCardModule, MatIconModule, MatTabsModule, MatTableModule, MatDialogModule } from '@angular/material';

import { ChartManagementComponent } from './components/chart-management/chart-management.component';
import { ChartReconfigurationDlgComponent } from './components/dialogs/chart-reconfiguration.component';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    HelmsmanRoutingModule,
    LayoutModule
  ],
  declarations: [ChartManagementComponent, ChartReconfigurationDlgComponent],
  exports: [ChartManagementComponent, ChartReconfigurationDlgComponent],
})
export class HelmsmanModule { }
