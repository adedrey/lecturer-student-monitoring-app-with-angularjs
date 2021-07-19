import { Component, OnInit } from '@angular/core';
import { LecturerService } from '../lecturer.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent implements OnInit {
  isLoading = false;
  token: string[] = [];
  displayedColumns : string[] = ['token'];
  dataSource;
  constructor(private lecturerService: LecturerService) { }

  ngOnInit() {
    this.lecturerService.getToken();
    this.lecturerService.getTokenStatusListener()
    .subscribe(
      token => {
        this.token = token;
        this.dataSource = new MatTableDataSource(this.token);
      }
    );
  }

}
