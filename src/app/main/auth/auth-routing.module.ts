import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckLoginComponent } from './check-login/check-login.component'; 
import { Login2Component } from './login-2/login-2.component';
import { ForgotPassword2Component } from './forgot-password-2/forgot-password-2.component';
import { VerifyPassword2Component } from './verify-code-2/verify-code-2.component';
import { ChangePassword2Component } from './change-password-2/change-password-2.component';
import { VerifyAccount2Component } from './verify-account-2/verify-account-2.component';
import { Register2Component} from './register-2/register-2.component';



const authRoutes: Routes = [
    { path: '', component: CheckLoginComponent },
    { path: 'login', component: Login2Component },
    { path: 'forgot-password', component: ForgotPassword2Component },
    { path: 'verify-code-2', component: VerifyPassword2Component },
    { path: 'change-password-2', component: ChangePassword2Component },
    { path: 'register', component: Register2Component },
    { path: 'verify-account-2', component: VerifyAccount2Component},
   
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/