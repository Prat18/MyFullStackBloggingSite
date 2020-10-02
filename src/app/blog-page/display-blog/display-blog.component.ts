import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBlogService } from '../../get-blog.service';
import { Blog } from '../blog.model';
import { AuthService } from 'src/app/home-page/auth.service';

@Component({
  selector: 'app-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.css'],
})
export class DisplayBlogComponent implements OnInit {
  constructor(
    private getBlogServie: GetBlogService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  rendered: boolean = false;
  liked: boolean = false;
  disabled: boolean = false;
  likeButton: boolean = false;
  isAuthenticated: boolean = false;
  id: string = '';
  Renderedblog: Blog = { title: '', description: '', content: '', likedBy: [] };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.isAuthenticated = this.authService.getAuthStatus();
    this.getBlogServie.renderBlog(this.id);
    this.getBlogServie.listenToRenderBlog().subscribe((blog: any) => {
      if (this.isAuthenticated) {
        for (var i = 0; i < blog[0].likedBy.length; i++) {
          if (blog[0].likedBy[i].id === this.authService.getAuthUserId()) {
            this.liked = true;
            this.likeButton = true;
            break;
          }
        }
      }
      this.rendered = true;
      this.Renderedblog = blog[0];
    });
  }

  onLike() {
    this.disabled = true;
    this.liked = !this.liked;
    this.getBlogServie
      .likeBlog(this.router.url.split('/')[2], this.liked)
      .subscribe(
        (result) => {
          console.log(result);
          if (result.success) this.likeButton = !this.likeButton;
          this.disabled = false;
        },
        (error) => {
          console.log(error);
          this.liked = !this.liked;
          this.disabled = false;
        }
      );
  }
}
