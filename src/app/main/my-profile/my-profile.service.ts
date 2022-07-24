import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { Staff } from './staff';
// import { STAFFS } from 'app/mock/mock-staff';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MyProfileService {
    // baseUrl = 'http://preview.engine.vehicle.mpwt.gov.kh:8000/preview/api/v1/auctions/cp';
    // baseUrl = 'https://reqres.in/api';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json',
            'withCredentials': 'true',
            // 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjEwMjYxLCJpYXQiOjE1ODEzMzY2NDAsImV4cCI6MTU4NzMzNjY0MCwiZGF0YSI6eyJpZCI6MTAyNjEsImVtYWlsIjoiMDk2NTQxNjcwNCIsInVzZXJfdHlwZSI6IkNMSUVOVCJ9fQ.Plu5Ik3MShaYizYNb8rcT94-Geqxs-wRdsErnMpgkTw'
        })
    };

    constructor(private http: HttpClient) { }

    viewProfile(): Observable<any> {
        return this.http
            .get<any>('/portal/profile')
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('', []))
            );
    }

    viewProfileUser(): Observable<any> {
        return this.http
            .get<any>('/portal/profile')
            .pipe(
                tap(_ => { }),
                catchError(this.handleError<any>('', []))
            );
    }

    // ==================== Update Profile
    updateUserPortal(body: object): Observable<any> {
        return this.http
            .put('/portal/profile', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    // ==================== Update Profile
    updateUser(body: object): Observable<any> {
        return this.http
            .put('/cp/my-profiles', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    // =================== Update password
    updatePassword(body: object): Observable<any> {
        return this.http
            .put('/portal/profile/change-password', body, this.httpOptions)
            .pipe(
                tap(_ => console.log('updating data')),
                catchError(this.handleError<any>('Cannot update profile', []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
           // console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
