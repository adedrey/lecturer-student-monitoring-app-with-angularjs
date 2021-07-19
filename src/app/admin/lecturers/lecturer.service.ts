import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Lecturer } from './lecturer.model';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private token: string[] = [];
  private lecturers: Lecturer[] = [];
  private lecturerChanged = new BehaviorSubject<Lecturer[]>([]);
  private tokenChanged = new BehaviorSubject<string[]>([]);
  constructor(private http: HttpClient, private router: Router) { }

  getLecturers() {
    // ...
    this.http.get<{lecturers: Lecturer[]}>('http://localhost:3000/api/admin/lecturers')
    .subscribe(responseData => {
      this.lecturers = responseData.lecturers;
      this.lecturerChanged.next(this.lecturers);
    });
  }
  getLecturersStatusListener() {
    return this.lecturerChanged.asObservable();
  }
  generateToken(postData: { token_no: number }) {
    this.http.post<{ message: string }>('http://localhost:3000/api/admin/lecturers/generate', postData)
    .subscribe(
      responseData => {
        this.getToken();
        this.router.navigateByUrl('/admin/lecturers');
      }
    );
  }

  getToken() {
    this.http.get<{token: string[]}>('http://localhost:3000/api/admin/lecturers/get-token')
    .subscribe(
      responseData => {
        this.token = responseData.token;
        this.tokenChanged.next(this.token);
      }
    );
  }
  getTokenStatusListener() {
    return this.tokenChanged.asObservable();
  }
  deleteLecturer(lecturerId: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/admin/lecturer/' + lecturerId)
    .subscribe(responseData => {
      const getLecturers = this.lecturers;
      const filterlecturers = getLecturers.filter(p => p._id !== lecturerId);
      this.lecturers = [...filterlecturers];
      this.lecturerChanged.next(this.lecturers);
      this.router.navigateByUrl('/admin/lecturers');
    });
  }
}
