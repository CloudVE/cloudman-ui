import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutModule } from '../shared/layout.module';
import { AboutRoutingModule } from './about-routing.module';

// Components
import { AboutCloudManPageComponent } from './components/about-cloudman-page/about-cloudman-page.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LayoutModule,
        AboutRoutingModule
    ],
    declarations: [AboutCloudManPageComponent]
})
export class AboutModule { }
