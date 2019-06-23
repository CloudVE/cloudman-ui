import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AppSettings } from '../../app.settings';
import { Project, ProjectChart } from '../models/project';
import { QueryResult } from '../models/query';


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
