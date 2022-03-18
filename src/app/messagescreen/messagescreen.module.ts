import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagescreenRoutingModule } from './messagescreen-routing.module';
import { MessagescreenComponent } from './messagescreen.component';

import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    MessagescreenComponent
  ],
  imports: [
    CommonModule,
    MessagescreenRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,

  ]
})
export class MessagescreenModule { }
