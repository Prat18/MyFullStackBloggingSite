import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SigninCred, LoginCred } from './credentials.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated: boolean = false;
  private userId: string;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getAuthUserId() {
    return this.getAuthData().userId;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signup(name: string, email: string, password: string) {
    console.log(name);
    const user: SigninCred = {
      username: name,
      email: email,
      password: password,
    };
    console.log(user.username);
    this.http.post('http://localhost:3000/signup', user).subscribe((result) => {
      console.log(result);
    });
  }

  login(email: string, password: string) {
    const loginCred: LoginCred = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'http://localhost:3000/login',
        loginCred
      )
      .subscribe(
        (result) => {
          const token = result.token;
          this.token = token;
          if (token) {
            const expiresInDuration = result.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = result.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) return;
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
    this.authStatusListener.next(this.isAuthenticated);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expiratiionDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiratiionDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) return;
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }

  verifyAccount(email: string, token: string) {
    const verify = {
      email: email,
      token: token,
    };
    this.http
      .post('http://localhost:3000/confirm-account', verify)
      .subscribe((result) => {
        console.log(result);
      }),
      (error: any) => {
        console.log(error);
      };
  }

  resendEmail(email: string) {
    this.http.post('http://localhost:3000/resend-token', { email }).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  passwordResetRequest(email: string) {
    return this.http.post<{message: string}>('http://localhost:3000/password-reset-request', {email});
  }

  resetPassword(token: string, email: string, password: string) {
    const resetCred = {
      token: token,
      email: email,
      password: password
    }
    this.http.post('http://localhost:3000/reset-password', resetCred).subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    })
  }
}
