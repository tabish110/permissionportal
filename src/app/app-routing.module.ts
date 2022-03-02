import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { FeatureComponent } from './feature/feature.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';



const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./logincomponent/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: FeatureComponent, children:[
       {
         path: 'manageuser' , component:ManageUsersComponent
       },

      {
        path:'table', component: TableComponent 
        
      },
      {
        path:'manageteam', component: ManageTeamComponent 
        
      },

    ]
  },
 
  {
    path: '**',
    loadChildren: () => import('./logincomponent/login.module').then(m => m.LoginModule)
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
