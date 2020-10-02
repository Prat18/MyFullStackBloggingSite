import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Comment } from './comment.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private blogId: string;
  private comments: Comment[] = [];
  private CommentUpdated = new Subject<Comment[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getCommentUpdatedListener() {
    return this.CommentUpdated.asObservable();
  }

  postComment(comment: string) {
    this.blogId = this.router.url.split('/')[2];
    const commentData = {
      comment: comment,
      blogId: this.blogId,
    };
    console.log(commentData);
    this.http
      .post<{ message: string; result: any }>(
        'http://localhost:3000/post-comment',
        commentData
      )
      .subscribe(
        (comment) => {
          console.log(comment);
          this.comments.push({
            commentId: comment.result._id,
            userId: comment.result.userId,
            name: comment.result.name,
            comment: comment.result.comment,
            date: comment.result.createdAt,
            editStatus: comment.result.editStatus,
          });
          this.CommentUpdated.next([...this.comments]);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getComments(blogId: string) {
    return this.http
      .get<{ comments: any; message: string }>(
        'http://localhost:3000/get-comment' + blogId
      )
      .pipe(
        map((commentData) => {
          return {
            comments: commentData.comments.map(
              (comment: {
                _id: string;
                blogId: string;
                comment: string;
                createdAt: Date;
                name: string;
                userId: string;
                edited: boolean;
              }) => {
                return {
                  commentId: comment._id,
                  userId: comment.userId,
                  name: comment.name,
                  comment: comment.comment,
                  date: comment.createdAt,
                  editStatus: comment.edited,
                };
              }
            ),
          };
        })
      )
      .subscribe((transformedComments) => {
        this.comments = transformedComments.comments;
        this.CommentUpdated.next([...this.comments]);
      });
  }

  deleteComment(commentId: string) {
    this.http
      .delete('http://localhost:3000/delete-comment/' + commentId)
      .subscribe(
        (result) => {
          console.log(result);
          const filterComment = this.comments.filter((comment) => {
            return comment.commentId !== commentId;
          });
          this.comments = filterComment;
          this.CommentUpdated.next([...this.comments]);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  editComment(commentId: string, updatedComment: string, userId: string) {
    const updatedCommentData = {
      userId: userId,
      commentId: commentId,
      updatedComment: updatedComment,
    };

    this.http
      .put('http://localhost:3000/edit-comment', updatedCommentData)
      .subscribe(
        (result) => {
          console.log(result);
          for (var i = 0; i < this.comments.length; i++) {
            if (this.comments[i].commentId === updatedCommentData.commentId) {
              this.comments[i].comment = updatedCommentData.updatedComment;
              this.comments[i].editStatus = true;
              break;
            }
          }
          this.CommentUpdated.next([...this.comments]);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
