import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: any;
  loginForm: any;
  forgot: any;
  fill: any;

  //when we call another object from different class
  constructor(private dataService: DataService, private router: Router, private messageService: MessageService, private formBuilder: FormBuilder) { }

  //to handle any initialization task,
  ngOnInit() {
    this.form = this.createForm();
    this.loginForm = this.loginuser();
    this.forgot = this.forgotpass();
  }

  //login form field
  loginuser() {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required],
    });
  }

  //signup form field
  createForm() {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required],
      confirmpassword: [null, Validators.required]
    }, {
      validator: this.confirmedValidator('password', 'confirmpassword')
    });
  }

  //forgot form feild
  forgotpass() {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  // match password and confirm password
  confirmedValidator(password: string, confirmpassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmpassword];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      } if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  //mehtod for saving new user.
  register() {
    if (this.form.status == 'VALID') {
      this.dataService.doRegisterUser(this.form.value.email, this.form.value.password);
      this.messageService.add({ severity: 'success', summary: 'Register', detail: 'Successfull' })
      this.form.reset();
      this.user_login();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Please fill Required fields', detail: 'Try Again' })
    }
  }

  userlogin = true;
  userregister = false;
  userforgot = false;;
  //Buttons clicks functionalities hide and show
  user_register() {
    this.userforgot = false;
    this.userlogin = false;
    this.userregister = true;
  }
  user_login() {
    this.userlogin = true;
    this.userregister = false;
    this.userforgot = false;
  }
  user_forgotpassword() {
    this.userlogin = false;
    this.userregister = false;
    this.userforgot = true;
  }

  //mehtod for login it will check the user is in the list or not 
  //then it will move forword  
  login(): void {
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Please fill Required fields', detail: 'Try Again' })
    } else {
      let check = this.dataService.registerUser.filter(a => this.loginForm.value.email === a.email
        && this.loginForm.value.password === a.password);
      if (check.length > 0) {
        this.messageService.add({ severity: 'success', summary: 'login', detail: 'Successfull' })
        this.router.navigate(["table"]);
      } else if (check.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'incorrect email and password', detail: 'Try Again' })
      }
    }
    this.loginForm.reset();
  }

  //for getting password back if you forgot
  forgotpassworrd() {

    if (this.forgot.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Please fill Required fields', detail: 'Try Again' })
    } else {
      let read = this.dataService.registerUser.find(a => this.forgot.value.email === a.email);
      if (read) {
        this.messageService.add({ severity: 'success', summary: 'Password', detail: '' });
        console.log(read.password)
        this.fill = read.password
      } else {
        this.messageService.add({ severity: 'error', summary: 'Incorrect', detail: 'Not Successfull' });
      }

      //  if (read.length >0 ){

      //    console.log(read.password)
      //    this.fill = read.forEach(current=>console.log('your password is',current.password));

      //    this.forgot.reset();
      //    this.fill = read.filter(function (current:any): void {
      //        return (current.password);
      //      });
      // }else  (read.length == 0) {
      //   this.messageService.add({severity:'error',summary: 'Incorrect', detail:'Not Successfull'});
      // // }

    }
    this.forgot.reset();
  }



}
