import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../students.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  studentForm: FormGroup;
  isLoading = false;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.init();
  }

  private init(){
    this.studentForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'matric_no': new FormControl(null, [Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'department': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    if(!this.studentForm.valid){
      return;
    }
    this.isLoading = true;
    const postData = {
      name: this.studentForm.value.name,
      matric_no: this.studentForm.value.matric_no,
      department: this.studentForm.value.department
    }
    this.studentService.createStudent(postData);
  }

}
