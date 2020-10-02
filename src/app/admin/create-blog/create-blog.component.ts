import { Component, OnInit } from '@angular/core';
import { EditorModule } from "@tinymce/tinymce-angular";
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { Blog } from 'src/app/blog-page/blog.model';
import { GetBlogService } from 'src/app/get-blog.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit{

  blog: FormGroup;
  previewImage: string

  constructor(private editor: EditorModule, private postBlogService: GetBlogService) {}

  onPost() {
    if(this.blog.invalid) return;
    const blogPost: Blog = { title: this.blog.value.title, description: this.blog.value.description, content: this.blog.value.content, likedBy: [] };
    this.postBlogService.postBlog(blogPost, this.blog.value.image);
    this.blog.reset();
  }

  ngOnInit() {
    this.blog = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      content: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.blog.patchValue({image: file});
    this.blog.get('image').updateValueAndValidity();
    const reader = new FileReader;
    reader.onload = () => {
      this.previewImage = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
}
