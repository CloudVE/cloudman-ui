import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { ChartManagementComponent } from './components/chart-management/chart-management.component';


const appRoutes: Routes = [
    { path: '', component: ChartManagementComponent },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class HelmsmanRoutingModule { }
