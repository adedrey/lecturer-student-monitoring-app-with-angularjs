import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LecturerService } from '../lecturer.service';

@Component({
  selector: 'app-create-lecturer',
  templateUrl: './create-lecturer.component.html',
  styleUrls: ['./create-lecturer.component.css']
})
export class CreateLecturerComponent implements OnInit {
  lecturerForm: FormGroup;
  isLoading = false;
  constructor(private lecturerService: LecturerService) { }

  ngOnInit() {
    this.init();
  }
  private init() {
    this.lecturerForm = new FormGroup({
      'token_no' : new FormControl(null, Validators.pattern(/^[1-9]+[0-9]*$/))
    });
  }

  onSubmit(){
    if(!this.lecturerForm.valid) {
      return;
    }
    this.isLoading = true;
    const postData = {
      token_no: this.lecturerForm.value.token_no
    }
    this.lecturerService.generateToken(postData);
  }

}
