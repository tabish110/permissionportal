import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../shared/data.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {


  global = this.dataService.getName()


  constructor(private dataService: DataService) {

  }



  ngOnInit(): void {

  }

}
