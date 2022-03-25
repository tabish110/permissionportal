import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ManagteamDialogComponent } from '../managteam-dialog/managteam-dialog.component';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  managePostForm: any;

  constructor(private formBuilder: FormBuilder,
    public dataService: DataService,
    private messageService: MessageService,
    // inject help us to get data from different class
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PostDialogComponent>,) { }

  ngOnInit(): void {
    this.managePostForm = this.postForm();
  }

  //form builder to create new post fields
  postForm() {
    return this.formBuilder.group({
      userId: [this.data.source.userId, Validators.required],
      discription: [this.data.source.body, Validators.required],
      user: [this.data.source.id],
      title: [this.data.source.title],
    });
  }

  //to add and update a post
  onadd() {
    if (this.data.isEdit == true) {
      let post: any = {
        title: this.managePostForm.value.title,
        body: this.managePostForm.value.discription,
        userId: this.managePostForm.value.userId
      }
      this.dataService.addPost(post).subscribe(
        response => {
          post.id = response;
          this.data.source.splice(0, 0, post);
          console.log(response)
        })

      console.log(this.data)
      this.dialogRef.close();

    } else if (this.data.isEdit == false) {

      this.dataService.updatePost(this.managePostForm.value)
        .subscribe(
          response => {
            this.managePostForm.value = this.data.source
            console.log(response);
          })

      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
