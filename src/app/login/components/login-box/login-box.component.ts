import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../app.settings';

@Component({
    selector: 'app-login-box',
    templateUrl: './login-box.component.html',
    styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {
    redirectUrl: string;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.redirectUrl = this.route.snapshot.queryParams['next'] || '/system_overview';
    }

    getApiRoot(): string {
        return AppSettings.CLOUDMAN_SERVER_ROOT;
    }
}
