import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  authStatusListener: Subscription;

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  loginPopup() {
    this.dialog.open(LoginComponent);
  }

  signupPopup() {
    this.dialog.open(SigninComponent);
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = this.authService.getAuthStatus();
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authStatusListener = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.authStatusListener.unsubscribe();
  }
}
