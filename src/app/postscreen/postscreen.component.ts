import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-postscreen',
  templateUrl: './postscreen.component.html',
  styleUrls: ['./postscreen.component.scss']
})
export class PostscreenComponent implements OnInit {

  Posts!: any[];

  constructor(public dataService: DataService,
    private dialog: MatDialog,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe((res: any) => {
      this.Posts = res;

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
}
