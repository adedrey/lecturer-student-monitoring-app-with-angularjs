import { Component, OnInit } from '@angular/core';
import { Facility } from '../../../shared/facility.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FacilityService } from '../facility.service';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html',
  styleUrls: ['./facility-detail.component.css']
})
export class FacilityDetailComponent implements OnInit {
  facility: Facility;
  isLoading = false;
  constructor(private route: ActivatedRoute, private facilityService: FacilityService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.facilityService.getFacilities();
    this.route.params.subscribe(
      (params: Params) => {
        if(params['id']){
          this.isLoading = false;
          const facilityId = params['id'];
          this.facilityService.getFacility(facilityId).subscribe(
            responseData => {
              this.facility = responseData.facility;
            }
          );
        }
      }
    )
  }

  onDelete(facilityId) {
    this.isLoading = true;
    this.facilityService.deleteFacility(facilityId);
  }
}
