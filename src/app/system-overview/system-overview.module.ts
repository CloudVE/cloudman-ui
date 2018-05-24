import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemOverviewRoutingModule } from './system-overview-routing.module';
import { LayoutModule } from '../shared/layout.module';
import { ClusterModule } from '../cluster/cluster.module';
import { MatCardModule, MatIconModule, MatTabsModule } from '@angular/material';

import { SystemOverviewPageComponent } from './components/system-overview-page/system-overview-page.component';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    SystemOverviewRoutingModule,
    LayoutModule,
    ClusterModule
  ],
  declarations: [SystemOverviewPageComponent]
})
export class SystemOverviewModule { }
