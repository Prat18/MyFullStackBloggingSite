import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Preview } from '../blog.model';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent {

  blogView: Preview[] = [
    {title: "title 1", description: "description 1"},
    {title: "title 2", description: "description 2"},
    {title: "title 3", description: "description 3"},
    {title: "title 4", description: "description 4"},
    {title: "title 5", description: "description 5"}
  ];

  constructor(private router: Router) { }

  clkTest() {
    this.router.navigate(['blog']);
  }
}
