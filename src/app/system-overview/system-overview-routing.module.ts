import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { SystemOverviewPageComponent } from './components/system-overview-page/system-overview-page.component';


const appRoutes: Routes = [
    { path: '', component: SystemOverviewPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class SystemOverviewRoutingModule { }
