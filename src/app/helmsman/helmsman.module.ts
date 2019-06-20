import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelmsmanRoutingModule } from './helmsman-routing.module';
import { LayoutModule } from '../shared/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatIconModule, MatTabsModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatTooltipModule } from '@angular/material';

import { ChartManagementComponent } from './components/chart-management/chart-management.component';
import { ChartReconfigurationDlgComponent } from './components/dialogs/chart-reconfiguration.component';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { HelmsManService } from './services/helmsman.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    HelmsmanRoutingModule,
    LayoutModule,
    AceEditorModule
  ],
  declarations: [ChartManagementComponent, ChartReconfigurationDlgComponent, InlineEditComponent],
  providers: [HelmsManService],
  exports: [ChartManagementComponent, ChartReconfigurationDlgComponent]
})
export class HelmsmanModule { }
