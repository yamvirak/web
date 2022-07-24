import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Service {


    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json',
            'withCredentials': 'true',
        })
    };

    constructor(private http: HttpClient) { }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for product consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    //==================================================================================>> Listing
    listing(params): Observable<any> {

        const httpOptions = {};
        //httpOptions['params'] = params;

        
        
        return this.http.get<any>('/cp/users', httpOptions);
    }

    changePassword(id:number = 0, data:any): Observable<any> {
        return this.http.post('/cp/users/'+id+'/change-password', data);
    }

    // create(data:any): Observable<any> {
    //     return this.http.post('/cp/branches', data);
    // }

    // update(id:number = 0, data:any = {}): Observable<any> {
    //     return this.http.post('/cp/branches/'+id+'?_method=PUT', data, this.httpOptions);
    // }

    // delete(id:number = 0): Observable<any> {
    //     return this.http.delete('/cp/branches/'+id, this.httpOptions);
    // }

   

   
}
