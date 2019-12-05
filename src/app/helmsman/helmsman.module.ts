import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelmsmanRoutingModule } from './helmsman-routing.module';
import { LayoutModule } from '../shared/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChartManagementComponent } from './components/chart-management/chart-management.component';
import { ChartReconfigurationDlgComponent } from './components/dialogs/chart-reconfiguration.component';
import { CreateProjectDlgComponent } from "./components/dialogs/create-project.component";
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { HelmsManService } from './services/helmsman.service';
import { ProjManService } from "./services/projman.service";
import { AddChartDlgComponent } from "./components/dialogs/add-chart.component";
import { SafePipe } from "./components/chart-management/safe-pipe";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    HelmsmanRoutingModule,
    LayoutModule,
    AceEditorModule
  ],
  declarations: [ChartManagementComponent, CreateProjectDlgComponent, AddChartDlgComponent, ChartReconfigurationDlgComponent, InlineEditComponent, SafePipe],
  providers: [HelmsManService, ProjManService],
  exports: [ChartManagementComponent, ChartReconfigurationDlgComponent]
})
export class HelmsmanModule { }
