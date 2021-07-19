import { Component, OnInit, ViewChild } from '@angular/core';
import { Facility } from 'src/app/shared/facility.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserFacilityService } from './user.facility.service';

@Component({
  selector: 'app-user-facility',
  templateUrl: './user-facility.component.html',
  styleUrls: ['./user-facility.component.css']
})
export class UserFacilityComponent implements OnInit {
  facilities: Facility[] = [];
  isLoading = false;
  displayedColumns : string[] = ['name', 'location', 'seat_no', 'action'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private facilityService: UserFacilityService) { }

  ngOnInit() {
    this.isLoading = true;
    this.facilityService.getFacilities();
    this.facilityService.getFacilityStatusListener()
    .subscribe(
      responseData => {
        this.isLoading = false;
        this.facilities = responseData;
        this.dataSource = new MatTableDataSource(this.facilities);
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  applyFilter(filterValue: string){
    this.dataSource.filter =  filterValue.trim().toLowerCase();
  }
}
