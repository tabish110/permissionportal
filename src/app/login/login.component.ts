import { registerLocaleData } from '@angular/common';
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
  signupForm: any;
  loginForm: any;
  forgotPasswordForm: any;
  resetPasswordForm: any;
  yourPasswordIs: any;
  show = false;
  userlogin = true;
  userregister = false;
  userforgot = false;
  resetpassword = false;
  global: any;

  //when we call another object from different class
  constructor(private dataService: DataService, private router: Router, private messageService: MessageService, private formBuilder: FormBuilder) {

  }

  //Buttons clicks functionalities hide and show
  redirectToRegisterForm() {
    this.userforgot = false;
    this.userlogin = false;
    this.userregister = true;
    this.resetpassword = false;
  }
  redirectToLoginForm() {
    this.userlogin = true;
    this.userregister = false;
    this.userforgot = false;
    this.resetpassword = false;
    this.loginForm.reset();
  }
  redirectToForgotpasswordForm() {
    this.userlogin = false;
    this.userregister = false;
    this.userforgot = true;
    this.resetpassword = false;
    this.show = false;
    this.forgotPasswordForm.reset();
  }
  redirectToResetpasswordForm() {
    this.resetpassword = true;
    this.userlogin = false;
    this.userregister = false;
    this.userforgot = false;
    this.resetPasswordForm.reset();
  }
  //to handle any initialization task,
  ngOnInit() {
    this.signupForm = this.userSignupFormBuilder();
    this.loginForm = this.userLoginFormBuilder();
    this.forgotPasswordForm = this.userForgotpasswordFormBuilder();
    this.resetPasswordForm = this.userResetpasswordFormBuilder();
  }

  //login form field
  userLoginFormBuilder() {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required],
    });
  }

  //signup form field
  userSignupFormBuilder() {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required],
      confirmpassword: [null, Validators.required]
    }, {
      validator: this.confirmedPasswordValidator('password', 'confirmpassword')
    });
  }

  //forgot form feild
  userForgotpasswordFormBuilder() {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
  // reset password field
  userResetpasswordFormBuilder() {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      newpassword: [null, Validators.required],
      confirmnewpassword: [null, Validators.required]
    }, {
      validator: this.confirmedPasswordValidator('newpassword', 'confirmnewpassword')
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

  //mehtod for saving new user.
  onRegister() {
    if (this.signupForm.status == 'VALID') {

      const registerUser = this.dataService.registerUser.find(a => this.signupForm.value.email === a.email);
      // ? is use for to check undefine and null value on let and const
      if (registerUser?.email == this.signupForm.value.email) {

        this.messageService.add({ severity: 'error', summary: 'User Already Exist', detail: 'Un Successfull' })
        return;
      } else {
        this.dataService.doRegisterUser(this.signupForm.value.email, this.signupForm.value.password);
        this.messageService.add({ severity: 'success', summary: 'Register', detail: 'Successfull' })
      }
      this.signupForm.reset();
      this.redirectToLoginForm();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Please Fill Required Fields', detail: 'Try Again' })
    }
  }




  //mehtod for login it will check the user is in the list or not 
  //then it will move forword  
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Please Fill Required Fields', detail: 'Try Again' })
    } else {
      let checkLoginUser = this.dataService.registerUser.filter(a => this.loginForm.value.email === a.email
        && this.loginForm.value.password === a.password);

      if (checkLoginUser.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'Incorrect Email Or Password', detail: 'Try Again' })
        return;
      }

      // if (check){this.global = check}  
      if (checkLoginUser[0].permission == true) {

        this.dataService.setName(this.loginForm.value.email);
        localStorage.setItem("username", this.loginForm.value.email);
        this.router.navigate(["manageuser"]);
        this.messageService.add({ severity: 'success', summary: 'login', detail: 'Successfull' });

      } else {
        this.messageService.add({ severity: 'error', summary: 'UnAutherized User', detail: 'Try Again' })
        return;
      }
    }

    
  }

  //for getting password back if you forgot
  onForgotpassword() {

    if (this.forgotPasswordForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Please Fill Required Fields', detail: 'Try Again' })
    } else {
      let readPasword = this.dataService.registerUser.find(a => this.forgotPasswordForm.value.email === a.email);
      if (readPasword) {
        this.yourPasswordIs = readPasword.password
        this.messageService.add({ severity: 'success', summary: 'Your Password', detail: readPasword.password });
        this.show = true;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Incorrect Email', detail: 'Not Successfull' });
        return;
      }


    }
    this.forgotPasswordForm.reset();
  }

  // to reset the password if the user is register
  onResetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Please Fill Required Fields', detail: 'Try Again' })
    } if (!this.dataService.registerUser.find(a => this.resetPasswordForm.value.email === a.email)) {
      this.messageService.add({ severity: 'error', summary: 'Incorrect Email', detail: 'Not Successfull' });
    }
    else {
      let findindex = this.dataService.registerUser.findIndex((item) => item.email == this.resetPasswordForm.value.email);

      this.dataService.registerUser[findindex].password = this.resetPasswordForm.value.newpassword;
      this.messageService.add({ severity: 'success', summary: 'Your New Password', detail: this.dataService.registerUser[findindex].password });

      this.redirectToLoginForm();
    }
  }
}
