import { Component } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { Observable, Subject, timer, merge } from 'rxjs';
import { map, tap, switchMap } from "rxjs/operators";

import { ClusterService } from "../../../shared/services/cluster.service";
import { ClusterNode}  from "../../../shared/models/cluster";
import { LoginService } from "../../../login/services/login/login.service";
import { NodeAddDlgComponent } from "../dialogs/node-add.component";


@Component({
    selector: 'cluster-node-list',
    templateUrl: './cluster-node-list.component.html',
    styleUrls: ['./cluster-node-list.component.css']
})
export class ClusterNodeListComponent {

    nodeObservable: Observable<ClusterNode[]>;
    nodeChanged = new Subject();
    public fetchingNodes = false;

    constructor(private clusterService: ClusterService,
                private _loginService: LoginService,
                private dialog: MatDialog) {
        this.nodeObservable = merge(timer(0, 10000), this.nodeChanged).pipe(
            tap(() => { this.fetchingNodes = true; }),
            switchMap( () => clusterService.getClusters()),
            map(clusters => clusters[0]),
            switchMap(cluster => this.clusterService.getClusterNodes(cluster.id)),
            tap(() => { this.fetchingNodes = false; }),
        )
    }

    openAddNodeDialog(obj: any) {
        const dialogRef = this.dialog.open(NodeAddDlgComponent,
                                           { data: obj });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'save') {

            }
        });
    }

    deleteNode(node) {
        this.clusterService.deleteClusterNode(node)
          .subscribe(result => { this.nodeChanged.next(null); });
  }
}
