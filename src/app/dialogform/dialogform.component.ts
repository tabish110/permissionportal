import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  roles: any = ['Developer', 'Testing', 'Documentation'];
  team: any = ['SQA Team', 'DEV Team', 'ANDRIOD Team'];
  hide = true;
  hide2 = true;

  constructor(
    private messageService: MessageService,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    // inject help us to get data from different class
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogformComponent>,
  ) { }

  ngOnInit() {

    this.dialogform = this.updateFromBuilder();

  }

  // this the dialog form fields 
  updateFromBuilder() {
    return this.formBuilder.group({
      email: [this.data.source.email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.data.source.password, Validators.required],
      confirmpassword: [this.data.source.confirmpassword, Validators.required],
      permission: [this.data.source.permission],
      username: [this.data.source.username, Validators.required],
      fullname: [this.data.source.fullname, Validators.required],
      phonenumber: [this.data.source.phonenumber,  [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      team: [this.data.source.team],
      roles: [this.data.source.roles],
    }, {
      validator: this.confirmedPasswordValidator('password', 'confirmpassword')

    });
  }

  // match password and confirm password
  confirmedPasswordValidator(password: string, confirmpassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmpassword];
      if (matchingControl.errors && !matchingControl.errors['confirmedPasswordValidator']) {
        return;
      } if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // this is for add a newuser and also Update a user field 
  onSave() {

    if (this.data.isEdit == true) {
      if (this.dialogform.status == 'VALID') {
        const newUser = this.dataService.registerUser.find(a => this.dialogform.value.email === a.email);
        if (newUser?.email == this.dialogform.value.email) {
          this.messageService.add({ severity: 'error', summary: 'Email Already Exist', detail: 'Un Successfull' })
          return;

        } else {
          this.dataService.doRegisterUser(
            this.dialogform.value.email,
            this.dialogform.value.password,
            this.dialogform.value.permission,
            this.dialogform.value.fullname,
            this.dialogform.value.username,
            this.dialogform.value.phonenumber,
            this.dialogform.value.team,
            this.dialogform.value.roles);
          this.messageService.add({ severity: 'success', summary: 'NewUser Created', detail: 'Successfull' })

        }
        this.dialogRef.close();
        
      } else { this.messageService.add({ severity: 'error', summary: 'Fill all the field' }) }
    } else if (this.data.isEdit == false) {
      
      let findindex = this.dataService.registerUser.findIndex((item) => item.id == this.data.source.id);
      this.dataService.registerUser[findindex].email = this.dialogform.value.email;
      this.dataService.registerUser[findindex].password = this.dialogform.value.password;
      this.dataService.registerUser[findindex].permission = this.dialogform.value.permission;
      this.dataService.registerUser[findindex].username = this.dialogform.value.username;
      this.dataService.registerUser[findindex].fullname = this.dialogform.value.fullname;
      this.dataService.registerUser[findindex].phonenumber = this.dialogform.value.phonenumber;
      this.dataService.registerUser[findindex].team = this.dialogform.value.team;
      this.dataService.registerUser[findindex].roles = this.dialogform.value.roles;
      this.messageService.add({ severity: 'success', summary: 'Record Updated', });
      this.dialogRef.close();}
    
    
  }

  onClose() {
    this.dialogRef.close();
  }

}
