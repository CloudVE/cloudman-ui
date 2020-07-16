import {Component} from '@angular/core';
import {LoginService} from "../../../login/services/login/login.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-system-overview-page',
    templateUrl: './system-overview-page.component.html',
    styleUrls: ['./system-overview-page.component.css']
})
export class SystemOverviewPageComponent {

    constructor(private titleService: Title,
                public loginService: LoginService) {
        this.titleService.setTitle("Overview");
    }
}
