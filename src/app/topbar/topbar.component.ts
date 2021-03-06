import { Component, OnInit, VERSION } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  providers: [DatePipe]
})
export class TopbarComponent implements OnInit {

  global = this.dataService.getName()
  global2 = localStorage.getItem('username')
  name = 'Angular ' + VERSION.major;
  date: any;
  allMenues: any[] = [];

  constructor(private dataService: DataService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService,
    public datepipe: DatePipe) {
    let currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    this.date = currentDateTime;
  }
  ngOnInit(): void {
    const userId = localStorage.getItem('id');
    const userObj = this.dataService.registerUser.find(item => item?.id === userId)
    this.allMenues = (userObj?.route && userObj?.route?.length > 0) ? userObj?.route : [];
    this.dataService.setName(this.allMenues);
  }

  // this will ask a confirmation when you user get logout
  logoutConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Logout ',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.clear();
        this.router.navigate(["/"])
        this.messageService.add({ severity: 'success', summary: 'Logout', detail: '', life: 3000 });
      }
    });
  }

}
