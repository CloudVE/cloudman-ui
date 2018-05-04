import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterRoutingModule } from './cluster-routing.module';
import { LayoutModule } from '../shared/layout.module';

import { MatCardModule, MatIconModule, MatTabsModule } from '@angular/material';

import { ClusterOverviewPageComponent } from './components/cluster-overview-page/cluster-overview-page.component';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    ClusterRoutingModule,
    LayoutModule
  ],
  declarations: [ClusterOverviewPageComponent]
})
export class ClusterModule { }
