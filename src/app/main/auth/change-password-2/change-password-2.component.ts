import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login-2',
    templateUrl: './change-password-2.component.html',
    styleUrls: ['./change-password-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChangePassword2Component implements OnInit {

    public isLoading: Boolean = false; 
    public form: FormGroup;
    hidePassword:boolean = true;

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
    changePassword() {
        this.isLoading = true; 
        let body = this.form.value;
        body.type = 'office';
        body.token =  localStorage.getItem('change-password-token');

        this._authService.changePassword(body).subscribe(res => {
          
            this.isLoading = false; 

            this._snackBar.open(res.message, 'Close', {duration: 2500, panelClass: ['green-bg']});
            this.route.navigateByUrl('/auth/login');

        }, err => {
            this.isLoading = false; 
            this._snackBar.open(err.error.message, 'Close', {duration: 2500, panelClass: ['red-bg']});

        });
    }

    private _buildForm() {
        this.form = new FormGroup({
            password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ]),
            password_confirmation: new FormControl( '', [ Validators.required, Validators.minLength(6), Validators.maxLength(20), this.passwordMatcher.bind(this) ]),


        });
    }
    
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
