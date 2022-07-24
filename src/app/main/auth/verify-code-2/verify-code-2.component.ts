import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { interval } from 'rxjs';

@Component({
    selector: 'login-2',
    templateUrl: './verify-code-2.component.html',
    styleUrls: ['./verify-code-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VerifyPassword2Component implements OnInit {
    
    public isResendLoading = false;
    public isLoading: Boolean = false; 
    public form: FormGroup;
    errorMessage: string = "";
    countDown;
    hasNoError:boolean = true;
    public counter = 60;
    public purpose: string;
    public data:object;
    public timer:number = 0;
    public username:any;
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
        private _snackBar: MatSnackBar,

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
        this.setInterval();

        this.username = localStorage.getItem('username');
        console.log(this.username);
        
    }

    // tslint:disable-next-line:typedef
    verifyCode() {
        this.isLoading = true; 
        let body = this.form.value;
        body.type = 'office';
        body.username =  localStorage.getItem('username');
        
        this._authService.verifyCode(body).subscribe(res => {
          
            this.isLoading = false; 

            this._snackBar.open(res.message, 'Close', {duration: 2500, panelClass: ['green-bg']});
            localStorage.setItem('change-password-token', res.token);

            if(res.status == "success"){
                this._snackBar.open("Successfuly Verify!", 'Close', {duration: 2500, panelClass: ['green-bg']});
                localStorage.setItem('change-password-token', res.token);
                this.route.navigate(['auth/change-password-2']);
            }else{
                this._snackBar.open("Incorrect security code.", 'Close', {duration: 2500, panelClass: ['red-bg']});
            }
        }, err => {
            console.log('ji');
            this.isLoading = false; 
            this._snackBar.open(err.error.message, 'Close', {duration: 2500, panelClass: ['red-bg']});

        });
    }

    setInterval(){
        interval(1000).subscribe( res => {
            this.timer =  60 - res;

            // if(this.timer < 0){                
            //     this.timer = 10 - res;
            //     console.log(this.timer);
                
            // }
            if(this.timer == 0){
                
           
            }
            
        })
    }

    reSendCode(){
      
      this.isResendLoading = true; 
      let body = this.form.value;
      body.username =  localStorage.getItem('username');
      
        this._authService.reSendCode(body).subscribe(res => {
         this._snackBar.open(res.message, 'Close',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-snackbar']});
          this.isResendLoading = false;
          localStorage.setItem('change-password-token', res.token);
            if(res.status == "success"){
              this.errorMessage = "យើងបានផ្ញើលេខកូដដែលបានផ្ទៀងផ្ទាត់ទៅអ្នកហើយ។ សូមបញ្ចូលហើយចុចប៊ូតុងផ្ទៀងផ្ទាត់។ ប្រសិនបើអ្នកមិនទទួលវាតាមរយៈតេឡេក្រាមឬទូរស័ព្ទឬអ៊ីម៉ែលសូមទាក់ទងការគាំទ្ររបស់អ្នក។ សូមអរគុណ!"; 
            }else if(res.message == "user-not-found"){
              this.hasNoError = false;
              this.errorMessage = "សុំទោស! យើងមិនអាចរកឃើញគណនីណាមួយដែលទាក់ទងនឹងទូរស័ព្ទដែលអ្នកបានផ្តល់ឱ្យទេ។ សូម​ព្យាយាម​ម្តង​ទៀត។ "; 
            }
          }, 
          error => {
            this.hasNoError = false;
            this.errorMessage = JSON.parse(error._body).error;
           
          });
    }
    /**
     * Build from
     */
    // tslint:disable-next-line:typedef
    private _buildForm() {
        this.form = new FormGroup({
            code: new FormControl( '', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ]),

        });
    }

    
}
