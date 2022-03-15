import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogformComponent } from '../dialogform/dialogform.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-managteam-dialog',
  templateUrl: './managteam-dialog.component.html',
  styleUrls: ['./managteam-dialog.component.scss']
})
export class ManagteamDialogComponent implements OnInit {

  manageform: any;

  permissionCols = [
    { field: 'username', header: 'Team' },
    { field: 'team', header: 'User ' },

  ];

  users: Array<any> = this.dataService.registerUser.map((a) => a.username);





  constructor(private formBuilder: FormBuilder,
    public dataService: DataService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    // inject help us to get data from different class
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ManagteamDialogComponent>,) { }

  ngOnInit(): void {

    this.manageform = this.manageteamform();
  }


  manageteamform() {
    return this.formBuilder.group({
      teamname: [this.data.source.teamname, Validators.required],
      discription: ['', Validators.required],
      user: [this.data.source.teamuser],

    });
  }

  onadd() {
    if (this.data.isEdit == true) {
      this.dataService.pushdata(this.manageform.value.teamname, this.manageform.value.user)


      for (let i = 0; i < this.data.source[this.data.source.length - 1].teamuser.length; i++) {
        let index = this.dataService.registerUser.findIndex((item) => item.username == this.data.source[this.data.source.length - 1].teamuser[i]);
        if (!this.dataService.registerUser[index].team) {
          this.dataService.registerUser[index].team = []
        }

        this.dataService.registerUser[index].team.push(this.manageform.value.teamname);
        // this.dataService.registerUser[index].team = this.dataService.registerUser.team.push([this.manageform.value.teamname]);
      }

      this.dialogRef.close();
    } else if (this.data.isEdit == false) {
      let findindex = this.dataService.teams.findIndex((item) => item.teamname == this.data.source.teamname);
      let index = this.dataService.registerUser.findIndex((item) => item.username == this.data.source.teamuser);
      this.dataService.teams[findindex].teamname = this.manageform.value.teamname;
      this.dataService.registerUser[index].team = this.manageform.value.teamname;
      this.dataService.teams[findindex].teamuser = this.manageform.value.user;
      this.messageService.add({ severity: 'success', summary: 'Record Updated', });
      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}



