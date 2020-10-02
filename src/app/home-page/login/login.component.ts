import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  forgot: boolean = true;
  message: string = '';

  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    this.authService.login(form.value.email, form.value.password);
  }

  onForgotClick() {
    this.forgot = false;
  }

  onForgot(form: NgForm) {
    console.log(form.value.email);
    this.authService.passwordResetRequest(form.value.email).subscribe((result) => {
      this.message = result.message;
      console.log(result);
    }, (error) => {
      console.log(error);
    })
  }
}
