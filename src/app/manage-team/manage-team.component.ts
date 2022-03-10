import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogformComponent } from '../dialogform/dialogform.component';
import { ManagteamDialogComponent } from '../managteam-dialog/managteam-dialog.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss']
})
export class ManageTeamComponent implements OnInit {



  permissionCols = [
    { field: 'teamname', header: 'Team' },
    { field: 'teamuser', header: 'Members ' },

  ];


  constructor(private formBuilder: FormBuilder, public dataService: DataService, private dialog: MatDialog, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void { }

  // when the specific user is deleted in a row 
  onRemove(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.teamname + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const index = this.dataService.teams.findIndex(val => val.id === data.id)
        this.dataService.teams.splice(index, 1)
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User Deleted', life: 3000 });
        this.messageService.add({ severity: 'warn', summary: 'Admin Cannot Be Deleted', });
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
    this.dialog.open(ManagteamDialogComponent, { data: { source: data, isEdit: isEdit } });
  }

}
