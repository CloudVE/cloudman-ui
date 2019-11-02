import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemOverviewRoutingModule } from './system-overview-routing.module';
import { LayoutModule } from '../shared/layout.module';
import { ClusterModule } from '../cluster/cluster.module';
import { HelmsmanModule } from '../helmsman/helmsman.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { SystemOverviewPageComponent } from './components/system-overview-page/system-overview-page.component';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    SystemOverviewRoutingModule,
    LayoutModule,
    ClusterModule,
    HelmsmanModule
  ],
  declarations: [SystemOverviewPageComponent]
})
export class SystemOverviewModule { }
