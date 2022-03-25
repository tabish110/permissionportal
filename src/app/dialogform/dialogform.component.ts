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
  Roles  = ["Developer", "Testing", "Documentation"];
  Team: Array<any> = this.dataService.teams.map((a) => a.teamname);
  // route: Array<any> = this.dataService.registerUser.map((a) => a.route);
  Route: Array<any> = [{ id: 0, name: 'manage user', icon: 'supervisor_account', path: 'manageuser' },
  { id: 1, name: 'manage team', icon: 'supervised_user_circle', path: 'manageteam' },
  { id: 2, name: 'customer', icon: 'face', path: 'customer' },
  { id: 3, name: 'product lsit', icon: 'add_shopping_cart', path: 'table' }];
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
    if (this.data && this.data?.source?.route && this.data?.source?.route.length > 0) {
      
        this.Route = this.data?.source?.route ;

    } else {
      this.Route = [{ id: 0, name: 'manage user', icon: 'supervisor_account', path: 'manageuser' },
      { id: 1, name: 'manage team', icon: 'supervised_user_circle', path: 'manageteam' },
      { id: 2, name: 'customer', icon: 'face', path: 'customer' },
      { id: 3, name: 'product lsit', icon: 'add_shopping_cart', path: 'table' }];
    }
  }

  // this the dialog form fields 
  updateFromBuilder() {
    return this.formBuilder.group({
      email: [this.data.source.email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.data.source.password, Validators.required],
      confirmpassword: [this.data.source.password, Validators.required],
      permission: [this.data.source.permission],
      username: [this.data.source.username, [Validators.required, Validators.pattern('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]],
      fullname: [this.data.source.username, Validators.required],
      phonenumber: [this.data.source.phonenumber, [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[/0-9]*$')]],
      team: [this.data.source.team],
      roles: [this.data.source.roles],
      route: [this.data.source.route, [Validators.required]]
    }, {
      validator: this.confirmedPasswordValidator('password', 'confirmpassword')

    });
  }
  get roles(): FormControl {
    return this.dialogform.get('roles') as FormControl;
  }
  get team(): FormControl {
    return this.dialogform.get('team') as FormControl;
  }
  get route(): FormControl {
    return this.dialogform.get('route') as FormControl;
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
            this.dialogform.value.roles,
            this.dialogform.value.route);
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
      this.dataService.registerUser[findindex].route = this.dialogform.value.route;


      // for(let i=0 ; i< this.data.source.team.length; i++){
      //   console.log(i);
      //   let match = 0;
      //   let match2 = 0;
      //   for(let j=0 ; j< this.dataService.teams.length; j++){
      //     console.log(j);
      //     for(let k=0 ; k< this.dataService.teams[j].teamuser.length; k++){
      //       let index = this.dataService.teams.findIndex((item) => this.dataService.teams[j].teamuser == this.data.source.username);
      //       if(index < 0){
      //         if(match2 > match){
      //           match = match2;
      //         }

      //         let selectedteam = this.data.source.team.findIndex(() =>  this.data.source.team[match] == this.dataService.teams[j].teamname);
      //         if(selectedteam >= 0){
      //           this.dataService.teams[j].teamuser.push(this.data.source.username)
      //           return;
      //         }else{
      //           match ++;
      //         }
      //       }else{
      //           match2 ++;
      //       }
      //     }  
      //   }

      // }
      // let index = this.dataService.teams.findIndex((item) => item.teamuser !== this.data.source.username);
      // this.dataService.teams[index].teamuser.push(this.dialogform.value.username);
      this.messageService.add({ severity: 'success', summary: 'Record Updated', });
      this.dialogRef.close();
    }


  }

  onClose() {
    this.dialogRef.close();
  }

}
