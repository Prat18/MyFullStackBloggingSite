import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginCred } from '../credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cred: LoginCred;

  onLogin(loginInfo: NgForm) {
    this.cred = {username: loginInfo.value.username, password: loginInfo.value.password};
    console.log(this.cred.username);
    console.log(this.cred.password);
  }
}
