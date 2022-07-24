import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'proposal',
        loadChildren: () => import('./proposal/module').then(m => m.Module),
    },

   

];

@NgModule({
    declarations: [
        
    ],
    imports     : [
        RouterModule.forChild(routes),
    ],

    schemas: [
    ],

    providers   : [
     
    ], 
    entryComponents: [
    ]
})
export class PrintingModule
{

}

