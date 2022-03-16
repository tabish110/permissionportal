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
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer.routing.module';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
    declarations: [
        CustomerComponent,

    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        ToolbarModule,
        ToastModule,
        ConfirmDialogModule,
        DialogModule,
        InputTextModule,
    ]
})
export class CustomerModule { }




