import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableComponent } from './table.component';
import { TableRoutingModule } from './table-routing.module';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    declarations: [
        TableComponent


    ],
    imports: [
        CommonModule,
        TableRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        ToolbarModule,
        ToastModule,
        ConfirmDialogModule,
        DialogModule,
        RadioButtonModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        InputNumberModule,
        ContextMenuModule,
        MultiSelectModule,
        InputTextareaModule,
    ]
})
export class TabledModule { }
