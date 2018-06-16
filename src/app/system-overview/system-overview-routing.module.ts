import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Services
import { AuthGuardService } from '../login/services/auth-guard/auth-guard.service';

// Pages
import { SystemOverviewPageComponent } from './components/system-overview-page/system-overview-page.component';


const appRoutes: Routes = [
    { path: '', component: SystemOverviewPageComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class SystemOverviewRoutingModule { }
