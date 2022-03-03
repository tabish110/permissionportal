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


  constructor(public dataService: DataService, private dialog: MatDialog, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.dataService.registerUser
  }


  onRemove(data: any) {
    console.log(data)
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.email + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.id > 0) {
          const index = this.dataService.registerUser.findIndex(val => val.id === data.id)
          this.dataService.registerUser.splice(index, 1)
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });
          // this.dataService.registerUser = this.dataService.registerUser.filter(val => val.id !== data.id);
          // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });
        }
      }
    });

  }

  onOpenDialog(data: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    this.dialog.open(DialogformComponent, { data: data });

  }

}



