import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ListingComponent } from './Income/component';
import { ViewComponent } from './view/component';



const routes: Routes = [
    {
        path: '', component: ListingComponent, 
        
    }, 
    {
        path: ':code', component: ViewComponent, 
        
    }
];



@NgModule({
    declarations: [
        ListingComponent, 
        ViewComponent,
        
    ],
    imports     : [
        RouterModule.forChild(routes),
        SharedModule,
        MatDividerModule
    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],

    providers   : [
       
    ], 
    entryComponents: [
       
    ]
})
export class Module
{

}

