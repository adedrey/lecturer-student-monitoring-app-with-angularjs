import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AdminAuthService } from './admin.auth.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private adminAuthService: AdminAuthService) {
    // ...
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const adminToken = this.adminAuthService.getToken();
    const authRequest = req.clone({
      headers : new HttpHeaders({
        Authorization: "Bearer " + token,
        AdminAuthorization: "Bearer " + adminToken
      })
    });
    return next.handle(authRequest);
  }
}
