import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AdminAuthService } from './admin.auth.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AdminAuthGuard implements CanActivate {
  constructor(private adminAuthService : AdminAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.adminAuthService.getAdminAuthStatus();
    if(!isAuth) {
      return this.router.navigate(['/admin', 'login']);
    }
    return isAuth;
  }
}
