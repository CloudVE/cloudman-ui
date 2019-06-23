import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelmsmanRoutingModule } from './helmsman-routing.module';
import { LayoutModule } from '../shared/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatCardModule, MatIconModule, MatTabsModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatTooltipModule, MatSelectModule, MatGridListModule } from '@angular/material';

import { ChartManagementComponent } from './components/chart-management/chart-management.component';
import { ChartReconfigurationDlgComponent } from './components/dialogs/chart-reconfiguration.component';
import { CreateProjectDlgComponent } from "./components/dialogs/create-project.component";
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { HelmsManService } from './services/helmsman.service';


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
  declarations: [ChartManagementComponent, CreateProjectDlgComponent, ChartReconfigurationDlgComponent, InlineEditComponent],
  providers: [HelmsManService],
  exports: [ChartManagementComponent, ChartReconfigurationDlgComponent]
})
export class HelmsmanModule { }
