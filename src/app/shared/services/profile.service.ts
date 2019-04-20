import { throwError as observableThrowError,  Observable } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { AppSettings } from '../../app.settings';
import { QueryResult } from '../models/query';
import { UserProfile } from '../models/profile';
import { AuthToken } from '../models/profile';
import { Credentials } from '../models/profile';
import { AWSCredentials } from '../models/profile';
import { OpenStackCredentials } from '../models/profile';
import { AzureCredentials } from '../models/profile';
import { GCPCredentials } from '../models/profile';
import { CredVerificationResult } from '../models/profile';


@Injectable()
export class ProfileService {

    private _profile_url = `${AppSettings.CLOUDLAUNCH_API_ENDPOINT}/auth/user/`;
    private _creds_url = `${this._profile_url}credentials/`;
    private _application_url = `${AppSettings.CLOUDLAUNCH_API_ENDPOINT}/infrastructure/clouds/`;
    private _auth_token_url = `${AppSettings.CLOUDLAUNCH_API_ENDPOINT}/auth/tokens/`;

    constructor(private http: HttpClient) { }

    public getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(this._profile_url);
    }

    public getCredentialsForCloud(cloud_id: string): Observable<Credentials[]> {
        const all_creds = this.getProfile().pipe(map(p => p.credentials));
        return all_creds.pipe(map(creds => creds.filter(c => c && c.cloud.id === cloud_id)));
    }

    public saveCredentials(creds: Credentials): Observable<Credentials> {
        return this.http.put<Credentials>(`${this._creds_url}${creds.id}/`, creds)
            .pipe(catchError(this.handleError));
    }

    public deleteCredentials(creds: Credentials): Observable<Credentials> {
        return this.http.delete<Credentials>(`${this._creds_url}${creds.id}/`)
            .pipe(catchError(this.handleError));
    }

    public createCredentials(creds: Credentials): Observable<Credentials> {
        return this.http.post<Credentials>(`${this._creds_url}`, creds)
            .pipe(catchError(this.handleError));
    }

    public verifyCredentials(creds: Credentials): Observable<CredVerificationResult> {
        const headers = {};
        addCredentialHeaders(headers, creds);
        return this.http.post<CredVerificationResult>(`${this._application_url}${creds.cloud.id}/authenticate/`,
            {}, { headers: new HttpHeaders(headers) })
            .pipe(catchError(this.handleError));
    }

    public getAuthTokens(): Observable<AuthToken[]> {
        const url = `${this._auth_token_url}`;
        return this.http.get<QueryResult<AuthToken>>(url).pipe(
            map(response => response.results),
            catchError(this.handleError));
    }

    public createAuthToken(token: AuthToken): Observable<AuthToken> {
        return this.http.post<AuthToken>(`${this._auth_token_url}`, token)
            .pipe(catchError(this.handleError));
    }

    public deleteAuthToken(token: AuthToken): Observable<AuthToken> {
        return this.http.delete<AuthToken>(`${this._auth_token_url}${token.id}/`)
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

export function addCredentialHeaders(headers: any, credentials: Credentials) {
    if (credentials && credentials.cloud) {
        if (credentials.id) {
            // Must be a saved set or credentials. Retrieve using ID
            headers['cl-credentials-id'] = credentials.id;
            return;
        }
        // Must be an unsaved set of credentials
        switch (credentials.resourcetype) {
            case 'OpenStackCredentials':
                const os_creds = <OpenStackCredentials>credentials;
                headers['cl-os-username'] = os_creds.os_username;
                headers['cl-os-password'] = os_creds.os_password;
                headers['cl-os-project-name'] = os_creds.os_project_name;
                headers['cl-os-project-domain-name'] = os_creds.os_project_domain_name;
                headers['cl-os-user-domain-name'] = os_creds.os_user_domain_name;
                break;
            case 'AWSCredentials':
                const aws_creds = <AWSCredentials>credentials;
                headers['cl-aws-access-key'] = aws_creds.aws_access_key;
                headers['cl-aws-secret-key'] = aws_creds.aws_secret_key;
                break;
            case 'AzureCredentials':
                const azure_creds = <AzureCredentials>credentials;
                headers['cl-azure-subscription-id'] = azure_creds.azure_subscription_id;
                headers['cl-azure-client-id'] = azure_creds.azure_client_id;
                headers['cl-azure-secret'] = azure_creds.azure_secret;
                headers['cl-azure-tenant'] = azure_creds.azure_tenant;
                headers['cl-azure-resource-group'] = azure_creds.azure_resource_group;
                headers['cl-azure-storage-account'] = azure_creds.azure_storage_account;
                headers['cl-azure-vm-default-username'] = azure_creds.azure_vm_default_username;
                break;
            case 'GCPCredentials':
                const gcp_creds = <GCPCredentials>credentials;
                // Parse then stringify credentials to remove any new lines
                headers['cl-gcp-credentials-json'] = JSON.stringify(JSON.parse(gcp_creds.gcp_service_creds_dict));
                headers['cl-gcp-credentials-json'] = JSON.stringify(JSON.parse(gcp_creds.gcp_service_creds_dict));
                break;
        }
        // Angular doesn't like empty header values, so trim empty values
        for (const h in headers) {
            if (!headers[h]) {
                delete (headers[h]);
            }
        }
    }
}
