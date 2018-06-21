import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelmsmanRoutingModule } from './helmsman-routing.module';
import { LayoutModule } from '../shared/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatIconModule, MatTabsModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatTooltipModule } from '@angular/material';

import { ChartManagementComponent } from './components/chart-management/chart-management.component';
import { ChartReconfigurationDlgComponent } from './components/dialogs/chart-reconfiguration.component';
import { MaterialDesignFrameworkModule, JsonSchemaFormModule } from 'angular2-json-schema-form'
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
    MaterialDesignFrameworkModule,
    JsonSchemaFormModule.forRoot(MaterialDesignFrameworkModule)
  ],
  declarations: [ChartManagementComponent, ChartReconfigurationDlgComponent],
  providers: [HelmsManService],
  exports: [ChartManagementComponent, ChartReconfigurationDlgComponent]
})
export class HelmsmanModule { }
