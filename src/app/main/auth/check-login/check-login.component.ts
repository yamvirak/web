//=========================================================>> Core Library
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

//=========================================================>> Third Library

//=========================================================>> Custom Library
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'login',
    templateUrl: './check-login.component.html',
    styleUrls: ['./check-login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CheckLoginComponent implements OnInit {

   
    constructor(
        private _fuseConfigService: FuseConfigService, 
        private _router: Router
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

        if(localStorage.getItem('temp-token')){
            this._router.navigate(['dashboard']);
        }else{
            this._router.navigate(['auth/login']);
        }
      

        //console.log('Login Component ngOnInit');
    }

  
}
