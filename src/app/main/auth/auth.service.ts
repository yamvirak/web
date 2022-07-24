import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public redirectUrl:string = '';
    constructor(private http: HttpClient) { }

    login(body: object): Observable<any> {
        return this.http.post('/auth/login', body);
    }
    
    signUp(body: object): Observable<any> {
        return this.http.post('/auth/register', body);
    }

    forgotPassword(body: object): Observable<any> {
        return this.http.post('/auth/get-reset-password-code', body);
    }

    verifyCode(body: object): Observable<any> {
        return this.http.post('/auth/verify-reset-password-code', body);
    }

    verifyAccount(body: object): Observable<any> {
        return this.http.post('/auth/register/verify-account', body);
    }
    // ================ Get Reset Password Code
    reSendCode(body: object): Observable<any> {
        return this.http.post('/auth/get-reset-password-code', body);
    }
    
    changePassword(body: object): Observable<any> {
        return this.http.post('/auth/change-password', body);
    }

    logout(): Observable<any> {
        return this.http
            .post('/logout', null);
    }

    isLoggedIn(): boolean {
        return true;
    }
    
}
