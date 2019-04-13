import { Injectable } from '@angular/core';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AppSettings } from '../../app.settings';
import { QueryResult } from '../models/query';
import {Cluster, ClusterNode} from "../models/cluster";
import {PlacementZone} from "../models/cloud";

@Injectable()
export class ClusterService {
    constructor(private http: HttpClient) { }

    private _cluster_url = `${AppSettings.CLOUDMAN_API_ENDPOINT}/clusters`;


    public getClusters(): Observable<Cluster[]> {
        return this.http.get<QueryResult<Cluster>>(`${this._cluster_url}/`).pipe(
            map(qr => qr.results));
    }

    public queryClusters(filter?: string, page?: number, page_size?: number): Observable<QueryResult<Cluster>> {
        let query_url = `${this._cluster_url}/?`;
        if (filter) {
            query_url = `${query_url}search=${filter}&`;
        }
        if (page) {
            query_url = `${query_url}page=${page}&`;
        }
        if (page_size) {
            query_url = `${query_url}page_size=${page_size}&`;
        }
        return this.http.get<QueryResult<Cluster>>(query_url);
    }

    public getCluster(id: string): Observable<Cluster> {
        return this.http.get<Cluster>(`${this._cluster_url}/${id}/`);
    }

    public getClusterNodes(cluster_id: string): Observable<ClusterNode[]> {
        return this.http.get<QueryResult<ClusterNode>>(`${this._cluster_url}/${cluster_id}/nodes/`)
            .pipe(
                map(response => response.results),
                catchError(this.handleError));
    }

    public createClusterNode(node: ClusterNode): Observable<ClusterNode> {
        return this.http.post<ClusterNode>(`${this._cluster_url}/${node.cluster.id}/nodes/`, node)
            .pipe(catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err);
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            return observableThrowError(err.message || err.error.message || 'Client error');
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            return observableThrowError(err.error || String(err) || 'Server error');
        }
    }
}
