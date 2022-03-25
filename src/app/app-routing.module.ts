import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature/feature.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./logincomponent/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: FeatureComponent, children: [
      {
        path: 'manageuser', canActivate: [AuthGuard],
        loadChildren: () => import('./manage-users/manage-user.module').then(m => m.ManageUserModule)
      },

      {
        path: 'table', canActivate: [AuthGuard],
        loadChildren: () => import('./table/table.module').then(m => m.TabledModule)

      },
      {
        path: 'manageteam', canActivate: [AuthGuard],
        loadChildren: () => import('./manage-team/manage-team.module').then(m => m.ManageTeamModule)

      },
      {
        path: 'customer', canActivate: [AuthGuard],
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)

      },
      {
        path: 'post',
        loadChildren: () => import('./postscreen/postscreen.module').then(m => m.PostscreenModule)
      },
    ]
  },
  {
    path: 'messagescreen',
    loadChildren: () => import('./messagescreen/messagescreen.module').then(m => m.MessagescreenModule)
  },
  {
    path: '**',
    loadChildren: () => import('./logincomponent/login.module').then(m => m.LoginModule)
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
