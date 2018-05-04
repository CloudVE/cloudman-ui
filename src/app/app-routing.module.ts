import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'cluster', pathMatch: 'full' },
    { path: 'cluster', loadChildren: './cluster/cluster.module#ClusterModule' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'auth', loadChildren: './login/login.module#LoginModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
