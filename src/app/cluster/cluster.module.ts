import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterRoutingModule } from './cluster-routing.module';
import { LayoutModule } from '../shared/layout.module';

import { OrderModule } from 'ngx-order-pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { ClusterManagementComponent } from './components/cluster-management/cluster-management.component';
import { ClusterAutoScalerListComponent } from "./components/cluster-autoscaler-list/cluster-autoscaler-list.component";
import { ClusterNodeListComponent } from "./components/cluster-node-list/cluster-node-list.component";
import { NodeAddDlgComponent } from './components/dialogs/node-add.component';
import { ApplicationService } from '../shared/services/application.service';
import { CloudService } from '../shared/services/cloud.service';
import { ClusterService } from '../shared/services/cluster.service';
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ClusterRoutingModule,
    LayoutModule,
    OrderModule
  ],
  declarations: [ClusterManagementComponent, NodeAddDlgComponent,
      ClusterNodeListComponent, ClusterAutoScalerListComponent],
  exports: [ClusterManagementComponent, NodeAddDlgComponent,
      ClusterNodeListComponent, ClusterAutoScalerListComponent],
  providers: [ApplicationService, CloudService, ClusterService]
})
export class ClusterModule { }
