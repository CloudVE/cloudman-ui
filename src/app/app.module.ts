import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AuthInterceptor } from './login/services/auth-interceptor';
import { HelmsmanModule } from './helmsman/helmsman.module';
import { ChartReconfigurationDlgComponent } from './helmsman/components/dialogs/chart-reconfiguration.component';
import { CreateProjectDlgComponent } from "./helmsman/components/dialogs/create-project.component";
import { ClusterModule } from './cluster/cluster.module';
import { NodeAddDlgComponent } from './cluster/components/dialogs/node-add.component';
import { AddChartDlgComponent } from "./helmsman/components/dialogs/add-chart.component";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
        cookieName: 'csrftoken',
        headerName: 'X-CSRFToken',
    }),
    AppRoutingModule,
    LoginModule,
    ClusterModule,
    HelmsmanModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }
  ],
  entryComponents: [CreateProjectDlgComponent, AddChartDlgComponent, ChartReconfigurationDlgComponent, NodeAddDlgComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
