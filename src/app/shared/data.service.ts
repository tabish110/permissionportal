import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  registerUser: Array<any> = [
    { id: '0', email: 'admin@gmail.com', password: 'admin', permission: true, fullname: 'Owner', username: 'admin', phonenumber: '032134450' },
    { id: '1', email: 'moiz@gmail.com', password: 'moiz', username: 'moiz', permission: false },
    { id: '2', email: 'ali@gmail.com', password: 'ali', username: 'ali', permission: false },
    { id: '3', email: 'hasan@gmail.com', password: 'hasan', username: 'hasan', permission: false },
    

  ];

  teams: any[] = [];
  name: any;


  constructor() { }
  // to save a user
  doRegisterUser(email: string, password: string, permission: boolean, fullname: '', username: string, phonenumber: '', team: any, roles: '') {
    this.registerUser.push({ id: this.generateId(), email, password, permission, fullname, username, phonenumber, team, roles })
    console.log(this.registerUser)
  }
  pushdata(teamname: string, teamuser: string) {
    this.teams.push({ teamname, teamuser });
    console.log(this.teams)
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

