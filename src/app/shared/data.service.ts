import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  registerUser: Array<any> = [
    { id: '0', email: 'admin@gmail.com', password: 'admin', permission: true }
  ];
  name: any;


  constructor() { }
  doRegisterUser(email: string, password: string) {
    this.registerUser.push({ id: this.generateId(), email, password, permission: false })
    console.log(this.registerUser)
  }

  setName(email: string) {
    this.name = (email)

  }
  getName() {
    return this.name;
  }

  generateId() {
    let text = '';

    text += this.registerUser.length;
    return text;
  }

  // permission(){
  // let permission
  // return permission = false
  // }

}

