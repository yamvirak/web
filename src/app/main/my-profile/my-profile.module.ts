import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule, MatTabsModule} from '@angular/material'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  FuseCountdownModule,
  FuseWidgetModule,
  FuseHighlightModule,
  FuseProgressBarModule,
  FuseShortcutsModule
} from '@fuse/components';

import { SharedModule } from 'app/shared/shared.module';

import { MyProfileRoutingModule as RoutingModule } from './my-profile.routing.module';
import { MainComponent } from './my-profile.component';
import { MyProfileComponent  } from './info/my-profile.component';

import { OverviewComponent  } from './info/overview/overview.component';
import { ChangePasswordComponent  } from './info/change-password/change-password.component';
import { SecurityComponent  } from './info/security/security.component';





@NgModule({
  declarations: [

    MainComponent,
    MyProfileComponent,

    OverviewComponent,
    ChangePasswordComponent,
    SecurityComponent

  ],
  imports: [
    RoutingModule,
    TranslateModule,
    MatProgressSpinnerModule, 

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatDividerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMenuModule, 
    MatTabsModule,

    FuseSharedModule,
    FuseCountdownModule,
    FuseWidgetModule,
    FuseHighlightModule,
    FuseProgressBarModule,
    FuseShortcutsModule,
    SharedModule
  ],
  exports: [
   
  ]
})
export class MyProfileModule { }
