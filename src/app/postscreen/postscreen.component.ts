import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-postscreen',
  templateUrl: './postscreen.component.html',
  styleUrls: ['./postscreen.component.scss']
})
export class PostscreenComponent implements OnInit {

  Posts!: any[];
  check!: any;
  constructor(public dataService: DataService,
    private dialog: MatDialog,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe((res: any) => {
      this.Posts = res;
      // testing api call DS
      this.dataService.getCheck().subscribe(res => {
        this.check = res
      })
    });
  }

  //to open dialog box
  onOpenDialog(isEdit: boolean = true, data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    this.dialog.open(PostDialogComponent, { data: { source: data, isEdit: isEdit } });
  }

  //to delete a post 
  onRemove(data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.dataService.deletePost(data.id)
          .subscribe(() => {
            let index = this.Posts.indexOf(data);
            this.Posts.splice(index, 1);
          });
      }

    });

  }
  // testing api calls DS
  navigate() {
    if (this.check.data[0].type == 1) {
      window.location.href = 'https://demo2.datasoft.ca:9000/api/sso/initiateSAMLRequest?return_url=http://localhost:4200/post&provider=OKTA'
    }
  }
}
