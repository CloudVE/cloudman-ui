import { Component } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { Observable, Subject, timer, merge, interval } from 'rxjs';
import { map, tap, switchMap, startWith } from "rxjs/operators";

import { ClusterService } from "../../../shared/services/cluster.service";
import { ClusterNode }  from "../../../shared/models/cluster";
import { LoginService } from "../../../login/services/login/login.service";
import { NodeAddDlgComponent } from "../dialogs/node-add.component";
import * as moment from 'moment';


@Component({
    selector: 'cluster-node-list',
    templateUrl: './cluster-node-list.component.html',
    styleUrls: ['./cluster-node-list.component.css']
})
export class ClusterNodeListComponent {

    nodeObservable: Observable<ClusterNode[]>;
    nodeChanged = new Subject();
    currentTimer: Observable<moment.Moment>;
    public fetchingNodes = false;

    constructor(public loginService: LoginService,
                private clusterService: ClusterService,
                private dialog: MatDialog) {
        this.nodeObservable = merge(timer(0, 10000), this.nodeChanged).pipe(
            tap(() => { this.fetchingNodes = true; }),
            switchMap( () => clusterService.getClusters()),
            map(clusters => clusters[0]),
            switchMap(cluster => this.clusterService.getClusterNodes(cluster.id)),
            tap(() => { this.fetchingNodes = false; }),
        )
        this.currentTimer = interval(5000).pipe(
                               startWith(0),
                               map(() => moment()));
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

     calculateUptime(node: ClusterNode, currentTime: moment.Moment) {
        const launchTime = moment(node.deployment.added);
        return moment.duration(currentTime.diff(launchTime)).humanize();
    }
}
