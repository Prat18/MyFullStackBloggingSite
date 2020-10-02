import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { Comment } from '../comment.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css'],
})
export class ListCommentComponent implements OnInit, OnDestroy {
  private blogId: string;
  private commentsSub: Subscription;
  isEdit: boolean = false;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {}

  onDelete(commentId: string) {
    this.commentService.deleteComment(commentId);
  }

  onEdit(comment: Comment, form: NgForm) {
    this.isEdit = !this.isEdit;
    if (comment)
      this.commentService.editComment(
        comment.commentId,
        form.value.updatedComment,
        comment.userId
      );
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.blogId = params['id'];
    });
    this.commentService.getComments(this.blogId);
    this.commentsSub = this.commentService
      .getCommentUpdatedListener()
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
  }

  ngOnDestroy() {
    this.commentsSub.unsubscribe();
  }
}
