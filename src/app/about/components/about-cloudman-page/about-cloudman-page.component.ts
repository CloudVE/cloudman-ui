import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-about-cloudman-page',
    templateUrl: './about-cloudman-page.component.html',
    styleUrls: ['./about-cloudman-page.component.css']
})
export class AboutCloudManPageComponent {

    constructor(private titleService: Title) {
        this.titleService.setTitle("About");
    }
}
