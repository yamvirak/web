import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Validators} from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {
   
    constructor(private http: HttpClient) { }

    getValidation(formSlug: string = ""): Observable<any> {
        return this.http.get<any>('/cp/validation?from='+formSlug).pipe(
            tap(_ => { })
        );
    }

    getFormValidators(formSlug: string = "", fieldSlug: string = "") {

        return {
            field:fieldSlug,
            validators: [Validators.required, Validators.maxLength(5)], 
            errors:[{ key:'required', message: "Please enter your name"}, { key:'maxlength', message: "Maxleng is 5"}],     
        }
    }

    getFormValidator(formSlug:string = ""){
        let formRes:any; 
        this.data.forEach(form =>{
            if(form.slug == formSlug){
             
               formRes = form; 
            }
        }); 

        return formRes; 
    }

    data = [
        {
            slug:"create-customer", 
            fields:[
                {
                    slug:"kh_name", 
                    errors:[
                        { key:'required', kh_message: "Please enter your name", en_message: "ABC"}, 
                        { key:'maxlength', kh_message: "Maxleng is 5", en_message: "DEF", value:5}
                    ], 
                }
            ]
        }
    ]

  
}
