import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'

//angular/material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { LoginComponent } from './home-page/login/login.component';
import { SigninComponent } from './home-page/signin/signin.component'
import { ToolbarComponent } from "./home-page/toolbar/toolbar.component";
import { ListBlogComponent } from "./blog-page/list-blog/list-blog.component";
import { DisplayBlogComponent } from "./blog-page/display-blog/display-blog.component";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    SigninComponent,
    ListBlogComponent,
    DisplayBlogComponent
  ],
  imports: [
    MatCardModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    SigninComponent,
    LoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
