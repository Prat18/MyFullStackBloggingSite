import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private authService: AuthService) {}

  onSignin(form: NgForm) {
    if(form.invalid) return;
    console.log(form.value.username, form.value.email, form.value.password);
    this.authService.signup(form.value.username, form.value.email, form.value.password);
  }

}
