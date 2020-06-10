import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginCred } from '../credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  cred: LoginCred;
  form: FormGroup;

  onLogin() {
    this.cred = {username: this.form.value.username, password: this.form.value.password};
    console.log(this.cred.username);
    console.log(this.cred.password);
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]})
    })
  }
}
