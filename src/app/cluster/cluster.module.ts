import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterRoutingModule } from './cluster-routing.module';
import { LayoutModule } from '../shared/layout.module';

import { OrderModule } from 'ngx-order-pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatExpansionModule, MatIconModule, MatTabsModule, MatButtonModule, MatDialogModule, MatSelectModule, MatInputModule } from '@angular/material';

import { ClusterManagementComponent } from './components/cluster-management/cluster-management.component';
import { ClusterNodeListComponent } from "./components/cluster-node-list/cluster-node-list.component";
import { NodeAddDlgComponent } from './components/dialogs/node-add.component';
import { ApplicationService } from '../shared/services/application.service';
import { CloudService } from '../shared/services/cloud.service';
import { ClusterService } from '../shared/services/cluster.service';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    ClusterRoutingModule,
    LayoutModule,
    OrderModule
  ],
  declarations: [ClusterManagementComponent, NodeAddDlgComponent, ClusterNodeListComponent],
  exports: [ClusterManagementComponent, NodeAddDlgComponent, ClusterNodeListComponent],
  providers: [ApplicationService, CloudService, ClusterService]
})
export class ClusterModule { }
