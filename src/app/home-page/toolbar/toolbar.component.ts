import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component'
import { SigninComponent } from '../signin/signin.component'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private dialog: MatDialog) {}

  loginPopup() {
    this.dialog.open(LoginComponent);
  }

  signupPopup(){
    this.dialog.open(SigninComponent);
  }
}
