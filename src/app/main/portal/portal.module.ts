import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    {
        path: '',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
    },

    // ==========================================================================================>> Dashboard
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/module').then(m=>m.ProjectDashboardModule),
    },

    // ==========================================================================================>> POS
    {
        path: 'pos',
        loadChildren: () => import('./pos/module').then(m=>m.Module),
    },
    

    // ==========================================================================================>> Branch
    {
        path: 'branches',
        loadChildren: () => import('./branch/module').then(m=>m.Module),
    },
    
    // ==========================================================================================>> Product
    {
        path: 'products',
        loadChildren: () => import('./product/all/module').then(m=>m.Module),
    },

    {
        path: 'product-types',
        loadChildren: () => import('./product/type/module').then(m=>m.Module),
    },

    // ==========================================================================================>> Sale
    {
        path: 'sales',
        loadChildren: () => import('./sale/module').then(m=>m.SaleModule),
    },

    // ==========================================================================================>> Expense
    {
        path: 'expenses',
        loadChildren: () => import('./expense/all/module').then(m=>m.ExpenseModule),
    },
    {
        path: 'expense-types',
        loadChildren: () => import('./expense/type/module').then(m=>m.ExpenseModule),
    },

     // ==========================================================================================>> Income
     {
        path: 'income',
        loadChildren: () => import('./income/all/module').then(m=>m.IncomeModule),
    },
    {
        path: 'income-types',
        loadChildren: () => import('./income/type/module').then(m=>m.IncomeTypeModule),
    },

    // ==========================================================================================>> User
    {
        path: 'users',
        loadChildren: () => import('./user/module').then(m=>m.Module),
    }
   

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
export class PortalModule
{

}

