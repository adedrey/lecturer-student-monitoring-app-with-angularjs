import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  private loginForm : FormGroup
  constructor(private authService : AuthService) {

   }

  ngOnInit() {
    this.initForm()
    this.authService.getAuthStatusListener().subscribe(
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
    this.authService.login(postData);
    this.isLoading = false;
  }
}
