import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../shared/students.model';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserStudentService } from './user.student.service';

@Component({
  selector: 'app-user-student',
  templateUrl: './user-student.component.html',
  styleUrls: ['./user-student.component.css']
})
export class UserStudentComponent implements OnInit {
  students: Student[] = [];
  isLoading = false;
  postSubscription: Subscription;
  displayedColumns : string[] = ['name', 'matric_no', 'department'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private studentService: UserStudentService) { }

  ngOnInit() {
    this.isLoading = true;
    this.studentService.getStudents();
    this.studentService.getStudentStatusListerner().subscribe
    (
      students => {
        this.isLoading = false;
        this.students = students;
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  applyFilter(filterValue: string){
    this.dataSource.filter =  filterValue.trim().toLowerCase();
  }
}
