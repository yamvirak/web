import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { environment as env } from '../../../../environments/environment'; 
import { duration } from 'moment';

@Component({
    selector: 'login-2',
    templateUrl: './forgot-password-2.component.html',
    styleUrls: ['./forgot-password-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPassword2Component implements OnInit {

    public isLoading: Boolean = false; 
    public form: FormGroup;


    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private validatorService: ValidatorService,
        private _authService: AuthService,
        private route: Router, 
        private _snackBar: MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        let x = this.validatorService.getFormValidator("create-customer"); 
        this._buildForm();
    }

    // tslint:disable-next-line:typedef
    forgotPassword() {
        this.isLoading = true; 
        let body = this.form.value;
        body.type = 'PASSWORD';
        //body.username =  localStorage.getItem('username');
        //console.log(body.username);

        this._authService.forgotPassword(body).subscribe(res => {
            localStorage.setItem('temp-token', res.token);
            this.isLoading = false; 
            this._snackBar.open(res.message, 'Close', {duration: 2500, panelClass: ['green-bg']});
            
            localStorage.setItem('username', this.form.get('username').value);
            this.route.navigateByUrl('auth/verify-code-2');

        }, err => {
            this.isLoading = false; 
            this._snackBar.open(err.error.message, 'Close', {duration: 2500, panelClass: ['red-bg']});

            // const errors = JSON.parse(err._body).errors;
            // for(let key in errors){
            //   let control = this.form.get(key);
            //   control.setErrors({'servererror':true});
            //   control.errors.servererror = errors[key][0];
            // } 
        });
    }

    /**
     * Build from
     */
    // tslint:disable-next-line:typedef
    private _buildForm() {
        this.form = new FormGroup({
            username: new FormControl( '', [ Validators.required, Validators.pattern('(^[0][0-9].{7}$)|(^[0][0-9].{8}$)|(^[855][0-9].{9}$)|(^[855][0-9].{10}$)|(.+@.+\..+)') ]),
        });
    }
}
