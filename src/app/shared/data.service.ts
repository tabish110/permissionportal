import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  registerUser: Array<any> = [
    { id: '0', email: 'admin@gmail.com', password: 'admin', permission: true, fullname: 'Owner', username: 'admin', phonenumber: '0321' },
    { id: '1', email: 'moiz@gmail.com', password: 'moiz', permission: false },
    { id: '2', email: 'ali@gmail.com', password: 'ali', permission: false },

  ];
  name: any;


  constructor() { }
  // to save a user
  doRegisterUser(email: string, password: string, permission: boolean, fullname: '', username: '', phonenumber: '', team: '', roles: '') {
    this.registerUser.push({ id: this.generateId(), email, password, permission, fullname, username, phonenumber, team, roles })
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

}

