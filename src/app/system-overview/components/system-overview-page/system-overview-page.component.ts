import { Component } from '@angular/core';
import { LoginService } from "../../../login/services/login/login.service";

@Component({
    selector: 'app-system-overview-page',
    templateUrl: './system-overview-page.component.html',
    styleUrls: ['./system-overview-page.component.css']
})
export class SystemOverviewPageComponent {

    constructor(public loginService: LoginService) {
    }
}
