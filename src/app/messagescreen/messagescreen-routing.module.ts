import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagescreenComponent } from './messagescreen.component';

const routes: Routes = [
  {
    path: '',
    component: MessagescreenComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagescreenRoutingModule { }
