import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { Service } from './service';
import { ListingComponent } from './listing/component';
import { ViewComponent } from './view/component';
import { SummaryProposal } from './view/part/summary-info-proposal/component';
import { ContactDetail } from './view/part/contact-detail/component';
import { TrainingProposal } from './view/part/training-proposal/component';
import { DescriptionProposal } from './view/part/description-proposal/component';
import { SummaryBudget } from './view/part/summary-budget/component';


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
        SummaryProposal,
        ContactDetail,
        TrainingProposal,
        DescriptionProposal,
        SummaryBudget
       
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

