import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { AboutCloudManPageComponent } from './components/about-cloudman-page/about-cloudman-page.component';


const appRoutes: Routes = [
    { path: '', component: AboutCloudManPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AboutRoutingModule { }
