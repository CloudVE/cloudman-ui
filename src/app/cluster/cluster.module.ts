import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterRoutingModule } from './cluster-routing.module';
import { LayoutModule } from '../shared/layout.module';

import { MatCardModule, MatIconModule, MatTabsModule } from '@angular/material';

import { ClusterManagementComponent } from './components/cluster-management/cluster-management.component';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    ClusterRoutingModule,
    LayoutModule
  ],
  declarations: [ClusterManagementComponent],
  exports: [ClusterManagementComponent]
})
export class ClusterModule { }
