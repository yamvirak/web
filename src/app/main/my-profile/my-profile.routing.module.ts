import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyProfileComponent } from './info/my-profile.component';
import { MainComponent } from './my-profile.component';

import { OverviewComponent  } from './info/overview/overview.component';
import { ChangePasswordComponent  } from './info/change-password/change-password.component';
import { SecurityComponent  } from './info/security/security.component';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: '', component: MyProfileComponent },
                    { path: 'overview', component: OverviewComponent },
                    { path: 'change-password', component: ChangePasswordComponent },
                    { path: 'security', component: SecurityComponent },
                ]
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MyProfileRoutingModule { }
