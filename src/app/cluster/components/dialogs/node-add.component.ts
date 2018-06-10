import { Component, Inject, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NgSwitch, NgSwitchDefault } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    FormGroupDirective,
    Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {
    VmType
} from '../../../shared/models/cloud';
import { CloudService } from '../../../shared/services/cloud.service';

@Component({
    selector: 'app-node-add-dialog',
    templateUrl: './node-add.component.html',
    styleUrls: ['./node-add.component.css']
})
export class NodeAddDlgComponent {

    // Form Controls
    form: FormGroup;
    vmTypeHelp = "Select an instance size";
    vmTypeCtrl = new FormControl('', Validators.required);
    
    // Observables
    vmTypeObs: Observable<VmType[]>;

    constructor(fb: FormBuilder,
            @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
            private _cloudService: CloudService) {
        this.form = fb.group({
            'vmType': this.vmTypeCtrl,
        });
        
        this.vmTypeObs = this._cloudService.getVmTypes('nectar');

    }

}
