import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetBlogService } from "../../get-blog.service";
import { Blog } from '../blog.model';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.css']
})
export class DisplayBlogComponent implements OnInit{
  constructor (private getBlog: GetBlogService, private route: ActivatedRoute) {}

  rendered = false;
  id: string = "";
  Renderedblog: Blog = {title: "", description: "", content: ""};

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getBlog.renderBlog(this.id);
    this.getBlog.listenToRenderBlog()
      .subscribe((blog: Blog) => {
        this.rendered = true;
        this.Renderedblog = blog[0];
      })
  }
}
