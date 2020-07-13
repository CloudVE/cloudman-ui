import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of, throwError} from "rxjs";
import {map, catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {AppSettings} from '../../app.settings';
import {Project, ProjectChart} from '../models/project';
import {QueryResult} from '../models/query';


@Injectable()
export class ProjManService {
    constructor(private http: HttpClient) { }

    private _projects_url = `${AppSettings.HELMSMAN_API_ENDPOINT}/projects`;

    public getProjects(): Observable<Project[]> {
        return this.http.get<QueryResult<Project>>(`${this._projects_url}/`)
            .pipe(map(response => response.results),
                  catchError(this.handleError));
    }

    public getProject(project_id: string): Observable<Project> {
        return this.http.get<Project>(`${this._projects_url}/${project_id}/`)
            .pipe(catchError(this.handleError));
    }

    public createProject(project: Project): Observable<Project> {
        return this.http.post<Project>(`${this._projects_url}/`, project)
            .pipe(catchError(this.handleError));
    }

    public deleteProject(project: Project): Observable<Project> {
        return this.http.delete<Project>(`${this._projects_url}/${project.id}/`)
            .pipe(catchError(this.handleError));
    }

    public getProjectCharts(project: Project): Observable<ProjectChart[]> {
        return this.http.get<QueryResult<ProjectChart>>(`${this._projects_url}/${project.id}/charts/`)
            .pipe(map(response => response.results),
                  map(results => results.filter(projchart => projchart.name != 'projman')),
                  catchError(this.handleError));
    }

    public getProjectChart(project: Project, chart_id: string): Observable<ProjectChart> {
        return this.http.get<ProjectChart>(`${this._projects_url}/${project.id}/charts/${chart_id}/`)
            .pipe(catchError(this.handleError));
    }

    public createProjectChart(chart: ProjectChart): Observable<ProjectChart> {
        return this.http.post<ProjectChart>(`${this._projects_url}/${chart.project.id}/charts/`, chart)
            .pipe(catchError(this.handleError));
    }

    public deleteProjectChart(chart: ProjectChart): Observable<ProjectChart> {
        return this.http.delete<ProjectChart>(`${this._projects_url}/${chart.project.id}/charts/${chart.id}/`)
            .pipe(catchError(this.handleError));
    }

    public updateProjectChart(chart: ProjectChart): Observable<ProjectChart> {
        return this.http.put<ProjectChart>(`${this._projects_url}/${chart.project.id}/charts/${chart.id}/`, chart)
            .pipe(catchError(this.handleError));
    }

    public rollbackProjectChart(chart: ProjectChart): Observable<ProjectChart> {
        chart.state = "rollback";
        return this.http.put<ProjectChart>(`${this._projects_url}/${chart.project.id}/charts/${chart.id}/`, chart)
            .pipe(catchError(this.handleError));
    }

    public getChartHealth(chart: ProjectChart, access_path: string): Observable<ProjectChart> {
        return this.http.get(access_path, { responseType: 'text'})
            .pipe(
                map(response => {
                    chart.app_healthy = true;
                    return chart;
                }),
                catchError((err, caught) => {
                    chart.app_healthy = false;
                    return throwError(err);
                }));
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
