import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AppSettings } from '../../app.settings';
import { Chart, InstallTemplate } from '../models/chart';
import { QueryResult } from '../models/query';


@Injectable()
export class HelmsManService {
    constructor(private http: HttpClient) { }

    private _charts_url = `${AppSettings.HELMSMAN_API_ENDPOINT}/charts/`;
    private _install_templates_url = `${AppSettings.HELMSMAN_API_ENDPOINT}/install_templates/`;


    public getInstallTemplates(options = {}): Observable<InstallTemplate[]> {
        return this.http.get<QueryResult<InstallTemplate>>(`${this._install_templates_url}`)
            .pipe(map(response => response.results),
                  catchError(this.handleError));
    }

    public getInstalledTemplate(template_name: string): Observable<InstallTemplate> {
        return this.http.get<InstallTemplate>(`${this._charts_url}${template_name}/`)
            .pipe(catchError(this.handleError));
    }

    public getInstalledCharts(options = {}): Observable<Chart[]> {
        return this.http.get<QueryResult<Chart>>(`${this._charts_url}`)
            .pipe(map(response => response.results),
                  catchError(this.handleError));
    }

    public getInstalledChart(chart_id: string): Observable<Chart> {
        return this.http.get<Chart>(`${this._charts_url}${chart_id}/`)
            .pipe(catchError(this.handleError));
    }

    public updateInstalledChart(chart: Chart): Observable<Chart> {
        return this.http.put<Chart>(`${this._charts_url}${chart.id}/`, chart)
            .pipe(catchError(this.handleError));
    }

    public rollbackChart(chart: Chart): Observable<Chart> {
        chart.state = "rollback";
        return this.http.put<Chart>(`${this._charts_url}${chart.id}/`, chart)
            .pipe(catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err);
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            return throwError(err.message || err.error.message || 'Client error');
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            return throwError(err.error || String(err) || 'Server error');
        }
    }

}
