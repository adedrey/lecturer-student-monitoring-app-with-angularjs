import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../students.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { GraphService } from '../../dashboard/graph.service';
import { Student } from '../../../shared/students.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  isLoading = false;
  postSubscription: Subscription;
  displayedColumns : string[] = ['name', 'matric_no', 'department', 'action'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private studentService: StudentService,private graphService: GraphService) { }

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
  onDelete(studentId) {
    this.isLoading =true;
    this.studentService.deleteStudentById(studentId).subscribe(
      result => {
        this.studentService.getStudents();
        this.graphService.getGraph();
      }
    )
  }

}
