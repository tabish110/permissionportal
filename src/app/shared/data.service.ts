import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  registerUser: Array<any> = [];


  constructor() { }
  doRegisterUser(email: string, password: string) {
    this.registerUser.push({ email, password })
    console.log(this.registerUser)
  }
}


