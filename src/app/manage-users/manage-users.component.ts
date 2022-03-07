import { Component, OnInit } from '@angular/core';
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
    // { field: 'id', header: 'ID' },
    { field: 'fullname', header: 'Name' },
    // { field: 'username', header: 'User Name' },
    { field: 'phonenumber', header: 'Phone Number' },
    { field: 'email', header: 'Email' },
    { field: 'password', header: 'Password' },
    { field: 'permission', header: 'Permission' },
    { field: 'team', header: 'Team' },
    { field: 'roles', header: 'Roles' },
  ];


  constructor(public dataService: DataService, private dialog: MatDialog, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

  }

  // when the specific user is deleted in a row 
  onRemove(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.email + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (data.id > 0) {

          const index = this.dataService.registerUser.findIndex(val => val.id === data.id)
          this.dataService.registerUser.splice(index, 1)
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Admin Cannot Be Deleted', });
          // this.dataService.registerUser = this.dataService.registerUser.filter(val => val.id !== data.id);
          // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });
        }
      }
    });

  }

  // this will open the dialog form for update and also for add a new user
  onOpenDialog(isEdit: boolean = true, data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    this.dialog.open(DialogformComponent, { data: { source: data, isEdit: isEdit } });
  }
}



