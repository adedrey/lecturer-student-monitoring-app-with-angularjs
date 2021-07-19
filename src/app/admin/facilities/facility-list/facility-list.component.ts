import { Component, OnInit, ViewChild } from '@angular/core';
import { Facility } from '../../../shared/facility.model';
import { FacilityService } from '../facility.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.css']
})
export class FacilityListComponent implements OnInit {
  facilities: Facility[] = [];
  isLoading = false;
  displayedColumns : string[] = ['name', 'location', 'seat_no', 'action'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private facilityService: FacilityService) { }

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
  onDelete(facilityId) {
    this.isLoading =true;
    this.facilityService.deleteFacility(facilityId);
  }

}
