import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// TinyMCE
import { EditorModule } from '@tinymce/tinymce-angular';

//angular/material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './home-page/login/login.component';
import { SigninComponent } from './home-page/signin/signin.component';
import { ToolbarComponent } from './home-page/toolbar/toolbar.component';
import { ListBlogComponent } from './blog-page/list-blog/list-blog.component';
import { DisplayBlogComponent } from './blog-page/display-blog/display-blog.component';
import { CreateBlogComponent } from './admin/create-blog/create-blog.component';
import { AboutComponent } from './admin/about/about.component';
import { HomeComponent } from './admin/home/home.component';
import { VerifyComponent } from './home-page/verify/verify.component';
import { ResetPasswordComponent } from './home-page/reset-pass/reset-pass.component';
import { PostCommentComponent } from './comment-box/post-comment/post-comment.component';
import { ListCommentComponent } from './comment-box/list-comment/list-comment.component';
import { FootbarComponent } from "./home-page/foot-bar/foot-bar.component";
import { AuthInterceptor } from './home-page/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    SigninComponent,
    ListBlogComponent,
    DisplayBlogComponent,
    CreateBlogComponent,
    AboutComponent,
    HomeComponent,
    VerifyComponent,
    ResetPasswordComponent,
    PostCommentComponent,
    ListCommentComponent,
    FootbarComponent
  ],
  imports: [
    EditorModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  entryComponents: [SigninComponent, LoginComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
