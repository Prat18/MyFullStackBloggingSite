import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SigninCred } from '../credentials.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  cred: SigninCred;

  onSignin(signinInfo: NgForm) {
    this.cred = {
      username: signinInfo.value.username,
      email: signinInfo.value.email,
      password: signinInfo.value.password
    }
    console.log(this.cred);
  }
}
