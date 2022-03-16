import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ManageUsersComponent } from './manage-users.component';
import { ManageUserRoutingModule } from './manage-user.routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    ManageUsersComponent

  ],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    CheckboxModule,
    InputTextModule
  ]
})
export class ManageUserModule { }
