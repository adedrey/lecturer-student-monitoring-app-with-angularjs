import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
interface AuthRegister {
  name: string, address: string, email: string, password: string, phone_no: number
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string;
  private tokenTimer: any;
  private isAuthenticated: boolean = false;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  createUser(postData: Auth) {
    // console.log(postData);
    this.http.post<{ message: string }>('http://localhost:3000/api/signup', postData)
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.router.navigate(['/user', 'login']);
        }
      );
  }

  login(postData: { email: string, password: string }) {
    this.http.post<{ token: any, expiresIn: number }>('http://localhost:3000/api/login', postData)
      .subscribe(
        responseData => {
          // console.log(responseData);
          const token = responseData.token;
          if (token) {
            this.token = token;
            const expiresIn = responseData.expiresIn;
            this.setTimer(expiresIn);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const dateNow = new Date();
            const expirationDate = new Date(dateNow.getTime() + expiresIn * 1000);
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate);
            this.router.navigate(['/user']);
          }

        }
      );
  }
  getToken() {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getAuthStatus() {
    return this.isAuthenticated;
  }
  private setTimer(expiresIn) {
    console.log('Setting Timer: ' + expiresIn);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/user', 'login']);
  }

  // Auto Login

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const currentDateStamp = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - currentDateStamp.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setTimer(expiresIn / 1000)
    }
  }

  private saveAuthData(token: string, expiresIn: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if (!token || !expiresIn) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expiresIn)
    }
  }
}
