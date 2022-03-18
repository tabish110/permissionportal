import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  registerUser: Array<any> = [
    {
      id: '0',
      email: 'admin@gmail.com',
      password: 'admin',
      permission: true,
      fullname: 'Owner',
      username: 'admin',
      phonenumber: '032134450',
      route: [
        { id: 0, name: 'manage user', icon: 'supervisor_account', path: 'manageuser' },
        { id: 1, name: 'manage team', icon: 'supervised_user_circle', path: 'manageteam' },
        { id: 2, name: 'customer', icon: 'face', path: 'customer' },
        { id: 3, name: 'product lsit', icon: 'add_shopping_cart', path: 'table' }]
    },
    {
      id: '1',
      email: 'moiz@gmail.com',
      password: 'moiz', 
      username: 'moiz',
      phonenumber: '032134450',
      permission: true,
      route: [
        { id: 0, name: 'customer', icon: 'face', path: 'customer' },
        { id: 1, name: 'productlsit', icon: 'add_shopping_cart', path: 'table' }]
    },
    {
      id: '2',
      email: 'ali@gmail.com',
      password: 'ali', 
      username: 'ali',
      phonenumber: '032134450',
      permission: false,
      route: [
        { id: 0, name: 'customer', icon: 'face', path: 'customer' },
        { id: 1, name: 'productlsit', icon: 'add_shopping_cart', path: 'table' }]
    },
    {
      id: '3',
      email: 'hasan@gmail.com',
      password: 'hasan',
      username: 'hasan',
      phonenumber: '032134450',
      permission: false,
      route: [
        { id: 0, name: 'customer', icon: 'face', path: 'customer' },
        { id: 1, name: 'productlsit', path: 'table' }]
    },


  ];

  customer: Array<any> = [
    { id: 0, name: 'Imran ali', email: 'imarn@gmail.com', phonenumber: '0321344500' },
    { id: 1, name: 'taha', email: 'taha@gmail.com', phonenumber: '0321344500' },
    { id: 2, name: 'jahangir', email: 'jahangir@gmail.com', phonenumber: '0321344500' },
    { id: 3, name: 'taimoor', email: 'taimoor@gmail.com', phonenumber: '0321344500' },
  ]
  teams: any[] = [];
  name: any[] = [];


  constructor(private http: HttpClient) { }


  getUsers() {
    return this.http.get('assets/registeruser.json')
  }
  getUser() {
    return this.http.get('assets/userroute.json')
  }

  generateuser(): User {
    const user: User = {
      id: '',
      email: '',
      password: '',
      permission: false,
      fullname: '',
      username: '',
      phonenumber: 123,
    };

    return user;
  }

  // save a customer
  createCustomer(name: string, email: string, phonenumber: number) {
    this.customer.push({ id: this.customer.length, name, email, phonenumber });
    console.log(this.customer)
  }

  // to save a user
  doRegisterUser(email: string, password: string, permission: boolean, fullname: '', username: string, phonenumber: '', team: any, roles: '', route: any) {
    this.registerUser.push({ id: this.generateId(), email, password, permission, fullname, username, phonenumber, team, roles, route })
    console.log(this.registerUser)
  }
  pushdata(teamname: string, teamuser: string) {
    this.teams.push({ teamname, teamuser });
    console.log(this.teams)
  }

  setName(email: Array<any>) {
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

