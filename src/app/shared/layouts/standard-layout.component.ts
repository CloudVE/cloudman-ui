import {ChangeDetectorRef, Component, Directive, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
    selector: 'app-standard-layout',
    templateUrl: 'standard-layout.component.html',
    styleUrls: ['standard-layout.component.css'],
})
export class StandardLayoutComponent {
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'page-header' })
export class PageHeaderDirective {
    // No behavior
    // The only purpose is to "declare" the tag in Angular2
}

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'page-body' })
export class PageBodyDirective {
    // No behavior
    // The only purpose is to "declare" the tag in Angular2
}
