import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { TopbarComponent } from './topbar/topbar.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'table', component: TableComponent },
  { path: 'top', component: TopbarComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
