import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  permissionCols = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'phonenumber', header: 'Phone Number' },
    { field: 'email', header: 'Email' },

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
        const index = this.dataService.customer.findIndex(val => val.id === data.id)
        this.dataService.customer.splice(index, 1)
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });
        // this.dataService.registerUser = this.dataService.registerUser.filter(val => val.id !== data.id);
        // this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });

      }
    });

  }

  // this will open the dialog form for update and also for add a new user
  onOpenDialog(isEdit: boolean = true, data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    this.dialog.open(CustomerDialogComponent, { data: { source: data, isEdit: isEdit } });
  }
}

