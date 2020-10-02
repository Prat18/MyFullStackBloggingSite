import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css'],
})
export class ResetPasswordComponent {
  token: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  onReset(form: NgForm) {
    console.log(form.value.password1, form.value.password2);
    if (form.value.password1 !== form.value.password2) return;
    this.route.params.subscribe((params) => {
      console.log(params);
      this.token = params['token'];
    });

    this.authService.resetPassword(this.token, form.value.email, form.value.password1);
  }
}
