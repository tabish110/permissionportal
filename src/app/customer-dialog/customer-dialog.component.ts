import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent implements OnInit {

  customerform: any;


  constructor(
    private messageService: MessageService,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    // inject help us to get data from different class
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CustomerDialogComponent>,
  ) { }

  ngOnInit() {

    this.customerform = this.updateFromBuilder();

  }

  // this the dialog form fields 
  updateFromBuilder() {
    return this.formBuilder.group({
      email: [this.data.source.email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      name: [this.data.source.name, Validators.required],
      phonenumber: [this.data.source.phonenumber, [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[/0-9]*$')]],

    });
  }


  // this is for add a newuser and also Update a user field 
  onSave() {

    if (this.data.isEdit == true) {
      if (this.customerform.status == 'VALID') {
        const newUser = this.dataService.customer.find(a => this.customerform.value.email === a.email);
        if (newUser?.email == this.customerform.value.email) {
          this.messageService.add({ severity: 'error', summary: 'Email Already Exist', detail: 'Un Successfull' })
          return;

        } else {
          this.dataService.createCustomer(
            this.customerform.value.name,
            this.customerform.value.email,
            this.customerform.value.phonenumber,
          );
          this.messageService.add({ severity: 'success', summary: 'NewUser Created', detail: 'Successfull' })

        }
        this.dialogRef.close();

      } else { this.messageService.add({ severity: 'error', summary: 'Fill all the field' }) }
    } else if (this.data.isEdit == false) {

      let findindex = this.dataService.customer.findIndex((item) => item.id == this.data.source.id);
      this.dataService.customer[findindex].email = this.customerform.value.email;
      this.dataService.customer[findindex].name = this.customerform.value.name;
      this.dataService.customer[findindex].phonenumber = this.customerform.value.phonenumber;
      this.messageService.add({ severity: 'success', summary: 'Record Updated', });
      this.dialogRef.close();
    }

  }

  onClose() {
    this.dialogRef.close();
  }

}
