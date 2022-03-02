import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogformComponent } from '../dialogform/dialogform.component';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  permissionCols = [
    { field: 'id', header: 'ID' },
    { field: 'email', header: 'Email' },
    { field: 'password', header: 'Password' },
    { field: 'permission', header: 'Login Permission' },
  ];
 
  big = [];
  


  constructor(public dataService: DataService, private dialog: MatDialog, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.dataService.registerUser
  }


  remove(data: any) {
    console.log(data)
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.email + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.registerUser = this.dataService.registerUser.filter(val => val.id !== data.id);
        this.big = [];
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });
      }
    });

  }
 
  openDialog(data: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    this.dialog.open(DialogformComponent, { data: data });

  }

}



