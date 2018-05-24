import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'system_overview', pathMatch: 'full' },
    { path: 'system_overview', loadChildren: './system-overview/system-overview.module#SystemOverviewModule' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'auth', loadChildren: './login/login.module#LoginModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
