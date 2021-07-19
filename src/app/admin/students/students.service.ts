import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Student } from '../../shared/students.model';
import { GraphService } from '../dashboard/graph.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  studentChanged = new BehaviorSubject<Student[]>([]);
  constructor(private http: HttpClient, private router: Router, private graphService: GraphService) {}
  getStudents() {
    // ...
    this.http.get<{students: Student[]}>('http://localhost:3000/api/admin/students')
    .subscribe(responseData => {
      this.students = responseData.students;
      this.studentChanged.next(this.students);
    });
  }
  createStudent(postData: Student) {
    // ...
    this.http.post<{student: Student}>('http://localhost:3000/api/admin/students/create', postData)
    .subscribe(
      responseData => {
        this.students.push(responseData.student);
        this.studentChanged.next(this.students);
        this.graphService.getGraph();
        this.router.navigateByUrl('/admin/students');
      }
    );
  }

  getStudentStatusListerner() {
    return this.studentChanged.asObservable();
  }

  deleteStudentById(studentId: string) {
    return this.http.delete<{message: string}>('http://localhost:3000/api/admin/students/' + studentId);
  }
}
