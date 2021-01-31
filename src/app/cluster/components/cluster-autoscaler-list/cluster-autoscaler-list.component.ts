import { Component, Input } from '@angular/core';
import { ErrorStateMatcher } from "@angular/material/core";
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
    ValidatorFn, FormGroupDirective, NgForm
} from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from "rxjs/operators";

import { PlacementZone, VmType } from '../../../shared/models/cloud';
import { ClusterService } from "../../../shared/services/cluster.service";
import { CloudService } from '../../../shared/services/cloud.service';
import { Cluster } from "../../../shared/models/cluster";
import { ClusterAutoScaler } from "../../../shared/models/cluster";


const NumberRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('min_nodes').value;
  const end = fg.get('max_nodes').value;
  return start !== null && end !== null && start < end
    ? null
    : { range: true };
};


class MaxNodesGreaterThanMinErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.touched && form.hasError('range');
    }
};


@Component({
    selector: 'cluster-autoscaler-list',
    templateUrl: './cluster-autoscaler-list.component.html',
    styleUrls: ['./cluster-autoscaler-list.component.css']
})
export class ClusterAutoScalerListComponent {

    // Form ControlsmaxNodesCtrl
    form: FormGroup;
    zoneHelp = "Select a zone";
    vmTypeHelp = "Select an instance size";
    autoScalingEnabledCtrl = new FormControl('');
    autoscalerIdCtrl = new FormControl(null);
    clusterCtrl = new FormControl('', Validators.required);
    scalingGroupNameCtrl = new FormControl({value: 'default', disabled: true}, Validators.required);
    zoneCtrl = new FormControl({value: 'default', disabled: true}, Validators.required);
    vmTypeCtrl = new FormControl('', Validators.required);
    vmTypePrefixCtrl = new FormControl('');
    vmTypeObjCtrl = new FormControl('', Validators.required);
    minNodesCtrl = new FormControl(0, Validators.min(0));
    maxNodesCtrl = new FormControl(5, Validators.min(0));

    clusterSubject = new BehaviorSubject<Cluster>(null);
    zoneSubject = new BehaviorSubject<PlacementZone>(null);
    autoScalerObs: Observable<{}>;
    public fetchingAutoScalers = false;
    minMaxNodesMatcher = new MaxNodesGreaterThanMinErrorMatcher();

    public errorMessage: string;
    public submitPending = false;

    // Observables
    zoneObs: Observable<PlacementZone[]>;
    vmTypeObs: Observable<VmType[]>;

    @Input()
    set cluster(cluster: Cluster) {
        this.clusterSubject.next(cluster);
    }
    get cluster() { return this.clusterSubject.value; }

    constructor(fb: FormBuilder,
                private clusterService: ClusterService,
                private cloudService: CloudService) {
        this.form = fb.group({
            'id': this.autoscalerIdCtrl,
            'cluster': this.clusterCtrl,
            'name': this.scalingGroupNameCtrl,
            'zone': this.zoneCtrl,
            'vm_type': this.vmTypeCtrl,
            'allowed_vm_type_prefixes': this.vmTypePrefixCtrl,
            'min_nodes': this.minNodesCtrl,
            'max_nodes': this.maxNodesCtrl
        }, { validator: NumberRangeValidator });

        this.autoScalingEnabledCtrl.valueChanges.subscribe(value => this.onChangeAutoScalingStatus(value));

        this.autoScalerObs = this.clusterSubject.pipe(
                              tap(() => { this.fetchingAutoScalers = false; }),
                              tap(cluster => this.clusterCtrl.patchValue(cluster)),
                              tap(cluster => this.autoScalingEnabledCtrl.patchValue(cluster.autoscale)),
                              tap(cluster => this.zoneCtrl.patchValue(cluster.default_zone.id)),
                              tap(cluster => this.zoneSubject.next(cluster.default_zone)),
                              tap(cluster => this.vmTypeCtrl.patchValue(cluster.default_vm_type)),
                              switchMap(cluster => this.clusterService.getClusterAutoScalers(cluster.id)),
                              map(autoscalers => autoscalers[0]),
                              tap(autoscaler => this.form.patchValue(autoscaler || {})),
                              tap(() => { this.fetchingAutoScalers = false; }));

        this.zoneObs = this.cloudService.getClouds().pipe(
                      tap(clouds => { this.zoneHelp = 'Retrieving zones...'; }),
                      map(clouds => clouds[0]),
                      switchMap(cloud => this.cloudService.getRegions(cloud.id)),
                      map(regions => regions[0]),
                      switchMap(region => this.cloudService.getPlacementZones(region.cloud, region.region_id)),
                      tap(zones => { this.zoneHelp = 'Placement zone for autoscaled nodes'; },
                          error => { this.errorMessage = <any>error; })
            );

        this.vmTypeObs = this.zoneSubject
            .pipe(
                tap(zone => { this.vmTypeHelp = 'Retrieving instance types...'; }),
                switchMap(zone => this.cloudService.getVmTypes(zone.cloud.id, zone.region.region_id, zone.zone_id)),
                tap(vmTypes => { this.vmTypeHelp = 'Instance type of autoscaled nodes';
                                       // Keep the two values synchronised between vmTypeCtrl and vmTypeObjCtrl
                                       const currentType = vmTypes.filter(vmType => vmType.name === this.vmTypeCtrl.value);
                                       this.vmTypeObjCtrl.patchValue(currentType ? currentType[0] : null); },
                    error => { this.errorMessage = <any>error; })
            );
        // Keep the two values synchronised between vmTypeCtrl and vmTypeObjCtrl
        this.vmTypeObjCtrl.valueChanges.subscribe(vmType => this.vmTypeCtrl.patchValue(vmType ? vmType.name : null));
    }

    isSameZone(z1: any, z2: any): boolean {
        return z1 && z2 && (z1.id === z2.id || z1 == z2.id || z1.id == z2 || z1 == z2);
    }

    onChangeAutoScalingStatus(autoscale: boolean): void {
        let cluster = this.cluster;
        cluster.autoscale = autoscale;
        this.errorMessage = null;
        this.clusterService.updateCluster(cluster).subscribe(
            data => this.clusterCtrl.patchValue(data),
            error => this.handleErrors(error));
    }

    onSubmit(autoscaler: ClusterAutoScaler): void {
        // For now, assume that the zone cannot be changed
        this.errorMessage = null;
        this.submitPending = true;
        if (autoscaler.id) {
            this.clusterService.updateClusterAutoScaler(autoscaler).subscribe(
                data => this.form.patchValue(data),
                error => this.handleErrors(error));
        }
        else {
            this.clusterService.createClusterAutoScaler(autoscaler).subscribe(
                data => this.form.patchValue(data),
                error => this.handleErrors(error));
        }
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
