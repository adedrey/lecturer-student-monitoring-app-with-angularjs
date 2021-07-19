import { Component, OnInit, ViewChild } from '@angular/core';
import { Lecturer } from '../lecturer.model';
import { LecturerService } from '../lecturer.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styleUrls: ['./lecturer-list.component.css']
})
export class LecturerListComponent implements OnInit {

  lecturers: Lecturer[] = [];
  isLoading = false;
  displayedColumns: string[] = ['name', 'email', 'rank', 'department', 'action'];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private lecturerService: LecturerService) { }

  ngOnInit() {
    this.isLoading = true;
    this.lecturerService.getLecturers();
    this.lecturerService.getLecturersStatusListener()
      .subscribe(
        responseData => {
          this.isLoading = false;
          this.lecturers = responseData;
          this.dataSource = new MatTableDataSource(this.lecturers);
          this.dataSource.paginator = this.paginator;
        }
      )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onDelete(lecturerId) {
    this.isLoading = true;
    this.lecturerService.deleteLecturer(lecturerId);
  }

}
