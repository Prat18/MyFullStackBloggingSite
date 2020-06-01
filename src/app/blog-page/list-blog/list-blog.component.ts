import { Component, OnInit } from "@angular/core";
import { GetBlogService } from '../../get-blog.service';
import { Preview } from '../blog.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit{

  loaded = false;
  blogView: Preview[];

  constructor(public getBlog: GetBlogService, private router: Router) { }

  navToBlog(id: string) {
    this.router.navigate(['/blog', id]);
  }

  ngOnInit() {
    this.getBlog.getBlogView();
    this.getBlog.listenToGetBlog()
      .subscribe((blogs: Preview[]) => {
        this.loaded = true;
        this.blogView = blogs;
      })
  }
}
