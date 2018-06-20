import { NgModule } from '@angular/core';

import { StandardLayoutComponent, PageHeaderDirective, PageBodyDirective } from './layouts/standard-layout.component';
import { ConfigPanelComponent, PanelHeaderDirective, PanelBodyDirective } from './layouts/config-panel.component';
import { IframeAutoHeightDirective } from './layouts/iframe-resizer';

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
