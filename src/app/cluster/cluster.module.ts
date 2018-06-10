import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterRoutingModule } from './cluster-routing.module';
import { LayoutModule } from '../shared/layout.module';

import { OrderModule } from 'ngx-order-pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatTabsModule, MatButtonModule, MatDialogModule, MatSelectModule } from '@angular/material';

import { ClusterManagementComponent } from './components/cluster-management/cluster-management.component';
import { NodeAddDlgComponent } from './components/dialogs/node-add.component';
import { CloudService } from '../shared/services/cloud.service';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ClusterRoutingModule,
    LayoutModule,
    OrderModule
  ],
  declarations: [ClusterManagementComponent, NodeAddDlgComponent],
  exports: [ClusterManagementComponent, NodeAddDlgComponent],
  providers: [CloudService]
})
export class ClusterModule { }
