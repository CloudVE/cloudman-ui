import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from "rxjs/operators";

import { ClusterService } from "../../../shared/services/cluster.service";
import { ClusterNode}  from "../../../shared/models/cluster";


@Component({
    selector: 'cluster-node-list',
    templateUrl: './cluster-node-list.component.html',
    styleUrls: ['./cluster-node-list.component.css']
})
export class ClusterNodeListComponent {

    nodeObservable: Observable<ClusterNode[]>;
    nodeChanged = new Subject();

    constructor(private clusterService: ClusterService) {
        this.nodeObservable = this.nodeChanged.pipe(
            startWith(null),
            switchMap( () => clusterService.getClusters()),
            map(clusters => clusters[0]),
            switchMap(cluster => this.clusterService.getClusterNodes(cluster.id))
        )
    }

    deleteNode(node) {
        this.clusterService.deleteClusterNode(node)
          .subscribe(result => { this.nodeChanged.next(null); });
  }
}
