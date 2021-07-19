import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminAuthService } from '../../admin.auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit {

  private loginForm : FormGroup;
  isLoading = false;
  constructor(private adminAuthService: AdminAuthService) {}

  ngOnInit() {
    this.initForm()
    this.adminAuthService.getAuthStatusEventListener().subscribe(
      status => {
        this.isLoading = false;
      }
    )
  }

  private initForm(){
    this.loginForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    this.isLoading = true;
    const postData = {
      email : this.loginForm.value.email,
      password : this.loginForm.value.password
    }

    this.adminAuthService.login(postData);
    this.isLoading = false;
  }

}
