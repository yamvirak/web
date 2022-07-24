import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private subject = new Subject<any>();

    send(user: any) {
    //    console.log(user); 
        this.subject.next(user);
    }

    clear() {
        this.subject.next({});
    }

    get(): Observable<any> {
        return this.subject.asObservable();
    }
}