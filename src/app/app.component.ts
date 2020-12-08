import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router, RouterOutlet, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import {routerTransition} from './app.routing.animations';
import {filter} from 'rxjs/operators';
import {AppSettings} from './app.settings';
import {LoginService} from './login/services/login/login.service';
import {User} from './shared/models/user';
import {Title} from "@angular/platform-browser";


@Component({
    selector: 'app-root',
    animations: [ routerTransition ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
                private _loginService: LoginService, private router: Router,
                private titleService: Title) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        router.events.pipe(
            filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEvent) => {
                this.updateLoggedInStatus();
            });
    }

    loggedIn: boolean;
    currentUser: User = null;

    updateLoggedInStatus(): void {
        this._loginService.isLoggedIn().then(loggedIn => {
            this.loggedIn = loggedIn;
            this.currentUser = this._loginService.getCurrentUser();
        });
    }

    getDeveloperAPILink(): string {
        return AppSettings.CLOUDMAN_API_ENDPOINT;
    }

    getSupportContactLink(): string {
        return AppSettings.CLOUDMAN_SUPPORT_LINK;
    }

    getState(outlet: RouterOutlet) {
        return outlet.activatedRouteData.state;
    }

    getPageTitle(): string {
        return this.titleService.getTitle();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
