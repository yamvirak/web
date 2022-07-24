import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './main/auth/auth.guard';


const routes: Routes = [
  
  // ================================================================================>> Auth
  {
    path: 'auth',
    loadChildren: () => import('./main/auth/auth.module').then(m => m.AuthModule)
  },

  // ================================================================================>> Portal
  {
    path: '',
    loadChildren: () => import('./main/portal/portal.module').then(m => m.PortalModule),
    canLoad: [AuthGuard]
  },

  // ================================================================================>> Printing
  {
    path: 'printing',
    loadChildren: () => import('./main/printing/printing.module').then(m => m.PrintingModule),
    canLoad: [AuthGuard]
  },
  
  // {
  //   path: '**',
  //   loadChildren: () => import('./main/my-profile/my-profile.module').then(m => m.MyProfileModule),
  //   canLoad: [AuthGuard]
  // },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {useHash: true}
    // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
