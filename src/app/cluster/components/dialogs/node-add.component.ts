import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from "rxjs/operators";

import { VmType } from '../../../shared/models/cloud';
import { ApplicationService } from "../../../shared/services/application.service";
import { ClusterService } from "../../../shared/services/cluster.service";
import { CloudService } from '../../../shared/services/cloud.service';
import { CloudDeploymentTarget } from "../../../shared/models/deployment";
import { ClusterNode } from "../../../shared/models/cluster";



@Component({
    selector: 'app-node-add-dialog',
    templateUrl: './node-add.component.html',
    styleUrls: ['./node-add.component.css']
})
export class NodeAddDlgComponent {

    // Form Controls
    form: FormGroup;
    vmTypeHelp = "Select an instance size";
    clusterCtrl = new FormControl('', Validators.required);
    vmTypeCtrl = new FormControl('', Validators.required);

    public errorMessage: string;
    public submitPending = false;
    
    // Observables
    vmTypeObs: Observable<VmType[]>;

    constructor(fb: FormBuilder,
                private dialogRef: MatDialogRef<NodeAddDlgComponent>,
                @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
                private appService: ApplicationService,
                private clusterService: ClusterService,
                private cloudService: CloudService) {
        this.form = fb.group({
            'cluster': this.clusterCtrl,
            'vmType': this.vmTypeCtrl,
        });

        this.vmTypeObs = forkJoin(this.clusterService.getClusters(), this.appService.getApplications()
        ).pipe(
            tap(data => { this.vmTypeHelp = 'Retrieving instance types...'; }),
            // data[0] contains the Cluster array, and data[1] contains the App array
            tap(data => this.clusterCtrl.patchValue(data[0][0])),
            map(([clusters, apps]) => <CloudDeploymentTarget>apps[0].versions[0].target_config[0].target),
            map(target => target.target_zone),
            switchMap(zone => this.cloudService.getVmTypes(zone.cloud.id, zone.region.region_id, zone.zone_id)),
            tap(vmTypes => { this.vmTypeHelp = 'What type of virtual hardware would you like to use?'; })
        );
    }

    onSubmit(formValues: any): void {
        this.errorMessage = null;
        this.submitPending = true;
        let node = new ClusterNode();
        node.cluster = this.clusterCtrl.value;
        node.instance_type = this.vmTypeCtrl.value.name;
        this.clusterService.createClusterNode(node).subscribe(
            data => this.dialogRef.close(),
            error => this.handleErrors(error));
    }

    handleErrors(errors: any) {
        this.submitPending = false;
        if (errors) {
            if (errors.hasOwnProperty('error')) {
                this.errorMessage = `${errors.error}`;
            } else if (typeof errors === 'string') {
                this.errorMessage = <string>errors;
            } else if (errors instanceof Array) {
                // Validation responses such as: ["Unknown error occurred"]
                this.errorMessage = '';
                errors.map(err => this.errorMessage += `${err}\n`);
            } else {
                // Validation responses such as: {"target_cloud":["This field is required."]}
                this.errorMessage = '';
                errors.map((err: any) => {
                    this.errorMessage += `${err}: ${errors[err]}\n`;
                    if (this.form.controls[err]) {
                        this.form.controls[err].setErrors({ remote: errors[err] });
                    }
                });
            }

        } else {
            this.errorMessage = `An unknown error occurred. No message was received from the server.`;
        }
    }
}
