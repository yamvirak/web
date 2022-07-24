import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Service as ServiceCls } from '../../my-profile';
import { MyProfileService as Service } from '../../my-profile.service';
import { Router } from '@angular/router';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar} from '@angular/material';

@Component({
    // selector: 'service-list',
    selector: 'change-password',
    templateUrl: './change-password.component.html',   
})

export class ChangePasswordComponent implements OnInit, AfterViewInit {

    public form: FormGroup;
    data: any[] = [];
    public isLoading: Boolean = false;
    hideOldPassword: Boolean = true;
    hidePassword: Boolean = true;
    hideConfirmPassword: Boolean = true;

    /** end template for table column */

    constructor(
        private service: Service,
        private validatorService: ValidatorService,
        private _formBuilder: FormBuilder,
        private route: Router,
        private snackBar: MatSnackBar,

    ) { }

    ngOnInit(): void {

        this._buildForm();     
    }

    ngAfterViewInit() {
    }

    submit(){
        if(this.form.valid){
            this.isLoading = true;
            const data = new FormData();
            data.append('old_password', this.form.get('old_password').value);
            data.append('password', this.form.get('password').value);
            data.append('confirm_password', this.form.get('confirm_password').value);

            this.service.updatePassword(this.form.value).subscribe(res => {
                this.isLoading = false;
                this.snackBar.open(res.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
                this.form.reset();
                this.form.controls.old_password.setErrors(null);
                this.form.controls.password.setErrors(null);
                this.form.controls.confirm_password.setErrors(null);

            }, err => {
                this.isLoading = false;
                // console.log(err); 
                // To check invalid confirm password
                // const confirm_password = JSON.parse(err._body);
                // if(confirm_password.status == 'fail'){
                //     this.snackBar.open(confirm_password.message, 'សារ',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000});
                // }
                // ================= sever error
                const errors = JSON.parse(err._body).errors;
                for(let key in errors){
                    let control = this.form.get(key);
                    control.setErrors({'servererror':true});
                    control.errors.servererror = errors[key][0];
                }                
            });
        }else{
            //console.log(this.form.valid); 
        }
        
    }

    private _buildForm() {
        this.form = new FormGroup({
            old_password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
            password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ]),
            confirm_password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20), this.passwordMatcher.bind(this) ])
        });
        
    }

    // confirm new password validator
    private passwordMatcher(control: FormControl): { [s: string]: boolean } {
        if (
            this.form &&
            (control.value !== this.form.controls.password.value)
        ) {
            return { passwordNotMatch: true };
        }
        return null;
    }
   
}


