import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';

import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.scss']
})
export class DialogformComponent implements OnInit {

  dialogform: any;

  constructor(
    private messageService: MessageService,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    // inject help us to get data from different class
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogformComponent>,
  ) {}

  ngOnInit() {
    this.dataService.registerUser,
      this.dialogform = this.updateFromBuilder();

  }
  updateFromBuilder() {
    return this.formBuilder.group({
      email: [this.data.email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.data.password, Validators.required],
      permission: [this.data.permission]
    });
  }

  onSave() {
    let findindex = this.dataService.registerUser.findIndex((item) => item.id == this.data.id);
    this.dataService.registerUser[findindex].email = this.dialogform.value.email;
    this.dataService.registerUser[findindex].password = this.dialogform.value.password;
    this.dataService.registerUser[findindex].permission = this.dialogform.value.permission;
    this.messageService.add({ severity: 'success', summary: 'Record Updated', });
    console.log(this.dataService.registerUser)
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }


}
