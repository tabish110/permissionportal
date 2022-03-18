import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../shared/data.service';
import { Route, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-messagescreen',
  templateUrl: './messagescreen.component.html',
  styleUrls: ['./messagescreen.component.scss']
})
export class MessagescreenComponent implements OnInit {

  constructor(private location: Location, private dataService: DataService, private routes: Router) { }

  ngOnInit(): void { }

  backClicked() {
    const saveId = localStorage.getItem('id')
    const paths = this.dataService.registerUser.find(item => item?.id === saveId)
    this.routes.navigate([paths.route[0].path]);
  }
}
