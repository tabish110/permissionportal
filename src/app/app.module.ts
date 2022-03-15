import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProductService } from './table/productservice';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TopbarComponent } from './topbar/topbar.component';
import { DialogformComponent } from './dialogform/dialogform.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FeatureComponent } from './feature/feature.component';
import { DatePipe } from '@angular/common';
import { ManagteamDialogComponent } from './managteam-dialog/managteam-dialog.component';
import { AuthGuard } from './auth.guard';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';




@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CheckboxModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [MaterialModule, FlexLayoutModule],
  declarations: [
    AppComponent,   
    TopbarComponent,  
    DialogformComponent,
    FeatureComponent,
    ManagteamDialogComponent,
    CustomerDialogComponent],
    
    bootstrap: [AppComponent],
  providers: [ProductService, MessageService, ConfirmationService,DatePipe,AuthGuard]
})

export class AppModule { }
