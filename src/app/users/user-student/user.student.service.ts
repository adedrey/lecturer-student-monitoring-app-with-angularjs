import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../shared/students.model';

@Injectable({
  providedIn: 'root'
})
export class UserStudentService {
  private students: Student[] = [];
  studentChanged = new BehaviorSubject<Student[]>([]);
  constructor(private http: HttpClient) {}
  getStudents() {
    // ...
    this.http.get<{students: Student[]}>('http://localhost:3000/api/user/students')
    .subscribe(responseData => {
      this.students = responseData.students;
      this.studentChanged.next(this.students);
    });
  }
  getStudentStatusListerner() {
    return this.studentChanged.asObservable();
  }

}
