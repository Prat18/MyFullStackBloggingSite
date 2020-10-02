import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {

  private token: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  onConfirm(form: NgForm) {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });

    this.authService.verifyAccount(form.value.email, this.token);
  }

  onResend(form: NgForm) {
    this.authService.resendEmail(form.value.email);
  }
}
