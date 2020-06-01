import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'

// TinyMCE
import { EditorModule } from '@tinymce/tinymce-angular';

//angular/material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { LoginComponent } from './home-page/login/login.component';
import { SigninComponent } from './home-page/signin/signin.component'
import { ToolbarComponent } from "./home-page/toolbar/toolbar.component";
import { ListBlogComponent } from "./blog-page/list-blog/list-blog.component";
import { DisplayBlogComponent } from "./blog-page/display-blog/display-blog.component";
import { CreateBlogComponent } from './admin/create-blog/create-blog.component';
import { AboutComponent } from './admin/about/about.component';
import { HomeComponent } from './admin/home/home.component';

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
    HomeComponent
  ],
  imports: [
    EditorModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    SigninComponent,
    LoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
