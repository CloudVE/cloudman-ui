import { Component, Inject, Optional } from '@angular/core';
import { UntypedFormControl } from "@angular/forms";
import { Project } from "../../models/project";

@Component({
    selector: 'app-create-project-dialog',
    templateUrl: './create-project.component.html',
    styleUrls: ['./create-project.component.css']
})
export class CreateProjectDlgComponent {

    projectCtrl = new UntypedFormControl('');

    constructor() {
    }

    getProject() : Project {
        let proj = new Project();
        proj.name = this.projectCtrl.value;
        return proj;
    }

}
