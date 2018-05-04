import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { ClusterOverviewPageComponent } from './components/cluster-overview-page/cluster-overview-page.component';


const appRoutes: Routes = [
    { path: '', component: ClusterOverviewPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class ClusterRoutingModule { }
