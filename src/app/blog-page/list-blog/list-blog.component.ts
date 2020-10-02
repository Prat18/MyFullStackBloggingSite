import { Component, OnInit, OnDestroy } from "@angular/core";
import { GetBlogService } from '../../get-blog.service';
import { Preview } from '../blog.model';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit, OnDestroy{

  loaded = false;
  blogView: Preview[] = [];
  postsSub = new Subscription;
  currentPage = 1;
  pageSizeOptions = [2, 5, 10, 15];
  blogsPerPage = 2;
  count = 0;

  constructor(public getBlog: GetBlogService, private router: Router) { }

  navToBlog(id: string) {
    this.router.navigate(['/blog', id]);
  }

  onDeleteBlog(id: string) {
    this.getBlog.deleteBlog(id);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(["/blogs"]);
    })
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.blogsPerPage = pageData.pageSize;
    this.getBlog.getBlogView(this.currentPage, this.blogsPerPage);
  }

  ngOnInit() {
    this.getBlog.getBlogView(this.currentPage, this.blogsPerPage);
    this.postsSub = this.getBlog.listenToGetBlog()
      .subscribe((blogs: any) => {
        this.loaded = true;
        this.count = blogs.maxCount;
        this.blogView = blogs.blogs;
      })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
