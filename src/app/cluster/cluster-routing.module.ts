import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Services
import { AuthGuardService } from '../login/services/auth-guard/auth-guard.service';

// Pages
import { ClusterManagementComponent } from './components/cluster-management/cluster-management.component';


const appRoutes: Routes = [
    { path: '', component: ClusterManagementComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class ClusterRoutingModule { }
