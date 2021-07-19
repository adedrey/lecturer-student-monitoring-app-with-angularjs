import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, User } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User;
  errorMessage: string = null;
  isLoading = false;
  ranks: string[] = ['Professor', 'Associate Professor', 'Doctor', 'Mr', 'Mrs'];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userService.getUser()
    .subscribe(responseData => {
      this.isLoading = false;
      this.user = responseData.user;
      this.profileForm = new FormGroup({
        'name': new FormControl(this.user.name, Validators.required),
        'rank': new FormControl(this.user.rank, [Validators.required]),
        'password': new FormControl(null),
        'new_password': new FormControl(null)
      })
    });
  }

  private initForm() {

  }

  onSubmit() {
    if (!this.profileForm.valid) {
      return;
    }
    this.isLoading = true;
    const postData = {
      name: this.profileForm.value.name,
      rank: this.profileForm.value.rank,
      password: this.profileForm.value.password,
      new_password: this.profileForm.value.new_password
    }
    this.userService.updateUser(postData)
    .subscribe(responseData => {
      this.isLoading = false;
      this.profileForm.setValue({
        name: this.user.name,
        rank: this.user.rank,
        password: null,
        new_password: null
      });
      this.errorMessage = "Changes Saved!";
    });
  }
  onClose(){
    this.errorMessage = null;
  }

}
