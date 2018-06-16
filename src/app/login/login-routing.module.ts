import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import {
    Routes,
    RouterModule,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
// Services
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

// Pages
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LogoutPageComponent } from './components/logout-page/logout-page.component';


const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent,
        resolve: {
            url: 'externalUrlRedirectResolver'
        },
        data: {
            externalUrl: '/cloudman/openid/openid/KeyCloak'
        }
    },
    { path: 'logout', component: LogoutPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
    providers: [
                {
                    provide: 'externalUrlRedirectResolver',
                    useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
                    {
                        window.location.href = (route.data as any).externalUrl;
                    }
                }
            ]
})
export class LoginRoutingModule { }
