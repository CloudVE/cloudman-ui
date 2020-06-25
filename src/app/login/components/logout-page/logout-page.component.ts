import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login/login.service';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-logout-page',
    templateUrl: './logout-page.component.html',
    styleUrls: ['./logout-page.component.css']
})
export class LogoutPageComponent implements OnInit {

    constructor(private titleService: Title,
                private _loginService: LoginService) {
        this.titleService.setTitle("Logout");
    }

    ngOnInit() {
        this._loginService.logout();
    }
}
