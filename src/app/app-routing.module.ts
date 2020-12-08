import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'system_overview', pathMatch: 'full' },
    { path: 'system_overview', loadChildren: () => import('./system-overview/system-overview.module').then(m => m.SystemOverviewModule) },
    { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
    { path: 'auth', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
