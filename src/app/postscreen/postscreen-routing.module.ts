import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostscreenComponent } from './postscreen.component';

const routes: Routes = [
  {
    path: '',
    component: PostscreenComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostscreenRoutingModule { }
