import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule,
         MatCardModule, MatMenuModule, MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AuthInterceptor } from './login/services/auth-interceptor';
import { HelmsmanModule } from './helmsman/helmsman.module';
import { ChartReconfigurationDlgComponent } from './helmsman/components/dialogs/chart-reconfiguration.component';
import { ClusterModule } from './cluster/cluster.module';
import { NodeAddDlgComponent } from './cluster/components/dialogs/node-add.component';

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
  entryComponents: [ChartReconfigurationDlgComponent, NodeAddDlgComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
