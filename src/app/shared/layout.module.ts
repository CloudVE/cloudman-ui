import { NgModule } from '@angular/core';

import {StandardLayoutComponent, PageHeaderDirective, PageBodyDirective} from './layouts/standard-layout.component';
import {ConfigPanelComponent, PanelHeaderDirective, PanelBodyDirective} from './layouts/config-panel.component';
import {IframeAutoHeightDirective} from './layouts/iframe-resizer';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    declarations: [
        StandardLayoutComponent,
        PageHeaderDirective,
        PageBodyDirective,
        ConfigPanelComponent,
        PanelHeaderDirective,
        PanelBodyDirective,
        IframeAutoHeightDirective
    ],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
    ],
    exports: [
        StandardLayoutComponent,
        PageHeaderDirective,
        PageBodyDirective,
        ConfigPanelComponent,
        PanelHeaderDirective,
        PanelBodyDirective,
        IframeAutoHeightDirective
    ]
})
export class LayoutModule { }
