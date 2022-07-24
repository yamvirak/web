import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ValidatorService } from 'app/shared/validator/validator.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/index';
import { AuthGuard } from '../auth.guard';
import { Subscription } from 'rxjs';
@Component({
    selector: 'login-2',
    templateUrl: './register-2.component.html',
    styleUrls: ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Register2Component implements OnInit {

    public isLoading = false;
    private loadingSubs: Subscription;
    public isRefValid = true;
    public image:string = "http://via.placeholder.com/200x200";
    public countries:any = [];
  
    public form         :FormGroup;
    hidePassword        :boolean  = true;
    hasNoError          :boolean  = true;
    errorMessage        :string   = '';
    sponsorId           :string   = '';
  
    public provinces:any = [];
    public districts:any = [];
  
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder,
        private validatorService: ValidatorService,
        private activatedRoute: ActivatedRoute,

        private _authService: AuthService,
        private route: Router, 
        private snackBar: MatSnackBar,
        
        private guard: AuthGuard, 
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
    
    ngOnInit(): void{

      //Build Form
      this.form = this.formBuilder.group({
        name: this.formBuilder.control('', [Validators.required, Validators.minLength(6),Validators.maxLength(64)]), 
        email: this.formBuilder.control('', []),
        phone: this.formBuilder.control('', [Validators.required, Validators.minLength(9),Validators.maxLength(12), Validators.pattern('^[0]{1}[1-9]{1}[0-9]{7,8}$')]), 
        password: this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]), 
        password_confirmation: this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.passwordMatcher.bind(this)]),
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

    onSubmit(){
    if(this.form.valid){
    //   this.uiService.loadingStateChanged.next(true);
        this.isLoading = true;
        
        const data = new FormData();
        data.append('name', this.form.get('name').value);
        data.append('phone', this.form.get('phone').value);
        data.append('email', this.form.get('email').value);
        data.append('password', this.form.get('password').value);
        data.append('password_confirmation', this.form.get('password_confirmation').value);
        this._authService.signUp(data).subscribe(
        (response) => {
            this.isLoading = false;
            if(response.status == "success"){
              localStorage.setItem('uid', response.data.uid);
              localStorage.setItem('node',response.data.node);
              localStorage.setItem('direction',response.data.direction);
              localStorage.setItem('phone', response.data.phone);
              this.route.navigate(['auth/verify-account-2', { purpose: 'VERIFY' }]);
              this.snackBar.open('Please verify your account.', 'Message',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['green-bg']});

            }else{
              this.snackBar.open(response.message, 'Message',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-bg']});
            }

        }, 
        error => {   
            this.isLoading = false;
            const errors = error.error.errors;
            this.snackBar.open('Please try again!', 'Message',{verticalPosition:"bottom", horizontalPosition:"right", duration:5000, panelClass: ['red-bg']});
            
            for(let key in errors){
                let control = this.form.get(key);
                control.setErrors({'servererror':true});
                control.errors.servererror = errors[key][0];

            }
        });
    }
    
    }
}
