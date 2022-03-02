import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  registerUser: Array<any> = [
    { id: '0', email: 'admin@gmail.com', password: 'admin', permission: true },
    { id: '1', email: 'moiz@gmail.com', password: 'moiz', permission: false },
    { id: '2', email: 'ali@gmail.com', password: 'ali', permission: false },
    { id: '3', email: 'imran@gmail.com', password: 'imran', permission: false },
    { id: '4', email: 'abbas@gmail.com', password: 'abbas', permission: false },
    { id: '5', email: 'muhammad@gmail.com', password: 'muhammad', permission: false },
    { id: '6', email: 'zamin@gmail.com', password: 'zamin', permission: false },
    { id: '7', email: 'khan@gmail.com', password: 'khan', permission: false }
  ];
  name: any;


  constructor() { }
  // to save a user
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

