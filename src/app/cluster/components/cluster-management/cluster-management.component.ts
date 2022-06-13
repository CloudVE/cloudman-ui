import { Component } from '@angular/core';
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { UntypedFormControl } from "@angular/forms";
import { Cluster } from "../../../shared/models/cluster";
import { ClusterService } from "../../../shared/services/cluster.service";

declare let window;

@Component({
    selector: 'app-cluster-management',
    templateUrl: './cluster-management.component.html',
    styleUrls: ['./cluster-management.component.css']
})
export class ClusterManagementComponent {

    clusterCtrl = new UntypedFormControl('');
    clusterObs: Observable<Cluster>;
    show_animation = true;

    constructor(private clusterService: ClusterService) {
        this.clusterObs = this.clusterService.getClusters().pipe(
                              map(clusters => clusters[0]),
                              tap(cluster => this.clusterCtrl.patchValue(cluster)));
    }

    onGrafanaLoaded(event: any) {
        this.show_animation = false;
    }

    getKeycloakPath() : string {
        return window.location.protocol + '//auth.' + window.location.host + '/auth/admin'
    }
}
