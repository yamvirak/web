import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OperationService {
    private subject = new Subject<any>();

    send(data: string) {
        this.subject.next(data);
    }

    clear() {
        this.subject.next(null);
    }

    get(): Observable<any> {
        return this.subject.asObservable();
    }
}