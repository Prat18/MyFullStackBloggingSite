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
  blogView: Preview[];
  postsSub = new Subscription;
  pageSizeOptions = [2, 5, 10, 15];
  pageIndex = 0;
  pageSize = 5;
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

  onPageChange(page: PageEvent) {
    console.log(page);
    this.pageIndex = page.pageIndex;
    this.pageSize = page.pageSize;
    this.getBlog.getBlogView(this.pageIndex, this.pageSize);
  }

  ngOnInit() {
    this.getBlog.getBlogView(this.pageIndex, this.pageSize);
    this.postsSub = this.getBlog.listenToGetBlog()
      .subscribe((blogs: Preview[]) => {
        this.loaded = true;
        this.blogView = blogs;
      })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
