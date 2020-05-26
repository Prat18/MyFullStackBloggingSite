import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListBlogComponent } from './blog-page/list-blog/list-blog.component';
import { DisplayBlogComponent } from './blog-page/display-blog/display-blog.component';

const appRoutes: Routes = [
  { path: 'listblogs', component: ListBlogComponent},
  { path: 'blog', component: DisplayBlogComponent},
]

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
