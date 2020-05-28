import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Blog } from './blog-page/blog.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GetBlogService {
  listBlog = new Subject();
  viewBlog = new Subject();
  constructor(private http: HttpClient) {}

  listenToGetBlog() {
    return this.listBlog.asObservable();
  }

  listenToRenderBlog() {
    return this.viewBlog.asObservable();
  }

  getBlogView() {
    this.http
      .get<any>('http://localhost:3000/blogs')
      .pipe(
        map((blogData) => {
          return blogData.map((blogData: { description: any; title: any; _id: any; }) => {
            return {
              id: blogData._id,
              title: blogData.title,
              description: blogData.description,
            };
          });
        })
      )
      .subscribe((transformedBlogData) => {
        this.listBlog.next(transformedBlogData);
      });
  }

  renderBlog(id: string) {
    this.http
      .get<any>('http://localhost:3000/blog' + id)
      .pipe(map((blogData) => {
        return blogData.map((blogData: { title: any; description: any; content: any; }) => {
        return {
          title: blogData.title,
          description: blogData.description,
          content: blogData.content
        }
        })
      }))
      .subscribe((blog: Blog) => {
        this.viewBlog.next(blog);
      })
  }

  postBlog(blog: Blog) {
    this.http
      .post<{ message: string }>('http://localhost:3000/post', blog)
      .subscribe((message) => {
        console.log(message);
      });
  }
}
