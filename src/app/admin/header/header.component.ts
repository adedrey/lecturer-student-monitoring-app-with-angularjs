import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/auth/admin.auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isAuthenticated:boolean = false;
  constructor(private adminAuthService : AdminAuthService) { }

  ngOnInit() {
    this.adminAuthService.getAuthStatusEventListener().subscribe(
      status => {
        this.isAuthenticated = status;
      }
    );
  }

  onLogout() {
    this.adminAuthService.logout();
  }

}
