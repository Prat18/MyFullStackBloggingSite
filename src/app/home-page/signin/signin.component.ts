import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { SigninCred } from '../credentials.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  cred: SigninCred;
  form: FormGroup

  onSignin() {
    this.cred = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    }
    console.log(this.cred);
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]})
    })
  }
}
