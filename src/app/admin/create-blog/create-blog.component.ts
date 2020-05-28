import { Component } from '@angular/core';
import { EditorModule } from "@tinymce/tinymce-angular";
import { NgForm } from '@angular/forms'
import { Blog } from 'src/app/blog-page/blog.model';
import { GetBlogService } from 'src/app/get-blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {

  constructor(private editor: EditorModule, private postBlogService: GetBlogService) {}

  onPost(blog: NgForm) {
    console.log(blog.value.content);
    const blogPost: Blog = { title: blog.value.title, description: blog.value.description, content: blog.value.content };
    console.log(blogPost.content)
    this.postBlogService.postBlog(blogPost);
    blog.resetForm();
  }
}
