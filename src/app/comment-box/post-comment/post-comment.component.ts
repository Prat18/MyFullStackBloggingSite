import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent {
  constructor(private commentService: CommentService) {}

  onComment(form: NgForm) {
    console.log(form.value.comment);
    this.commentService.postComment(form.value.comment);
  }
}
