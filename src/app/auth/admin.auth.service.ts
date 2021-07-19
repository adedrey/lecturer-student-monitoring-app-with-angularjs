import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminAuthService {
  token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  getAuthStatusListener = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  login(postData: { email: string, password: string }) {
    this.http.post<{ token: string, expiresIn: string }>('http://localhost:3000/api/admin/login', postData)
      .subscribe(responseData => {
        const token = responseData.token;
        if (token) {
          this.token = token;
          const expiresIn = responseData.expiresIn;
          this.isAuthenticated = true;
          this.getAuthStatusListener.next(true);
          this.setTokenTimer(expiresIn);
          const dateNow = new Date();
          const expirationDate = new Date(dateNow.getTime() + +expiresIn * 1000);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/admin']);
        }

      });
  }
  getAdminAuthStatus() {
    return this.isAuthenticated;
  }
  getAuthStatusEventListener() {
    return this.getAuthStatusListener.asObservable();
  }
  getToken() {
    return this.token;
  }
  private setTokenTimer(expiresIn) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }

  autoAuthAdmin(){
    const authInformation = this.getAuthData();

    if(!authInformation){
      return;
    }
    const currentDate = new Date();
    const expiresIn = authInformation.expiresIn.getTime() - currentDate.getTime();

    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.getAuthStatusListener.next(true);
      this.setTokenTimer(expiresIn/1000);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.getAuthStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/admin', 'login']);
  }

  private saveAuthData(token: string, expiresIn: Date) {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminExpiresIn', expiresIn.toISOString());
  }

  private getAuthData() {
    const token = localStorage.getItem('adminToken');
    const expiresInDuration = localStorage.getItem('adminExpiresIn');
    if (!token || !expiresInDuration) {
      return;
    }
    return {
      token: token,
      expiresIn: new Date(expiresInDuration)
    };
  }

  private clearAuthData() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminExpiresIn');
  }
}
