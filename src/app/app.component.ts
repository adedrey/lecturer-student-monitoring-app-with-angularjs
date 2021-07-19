import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AdminAuthService } from './auth/admin.auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LAPU';

  constructor(private authService: AuthService, private adminAuthService: AdminAuthService) {}
  ngOnInit() {
    this.authService.autoAuthUser();
    this.adminAuthService.autoAuthAdmin();
  }
}
