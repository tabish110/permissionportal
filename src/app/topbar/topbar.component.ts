import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../shared/data.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
 
  global = this.dataService.getName()

  constructor(private dataService: DataService, private confirmationService : ConfirmationService, private router: Router, private messageService: MessageService) {}
  ngOnInit(): void {}

  logoutConfirmation(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to Logout ' ,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(["/"])
        this.messageService.add({ severity: 'success', summary: 'Logout', detail: '', life: 3000 });
      }
    });
  }
  
}
