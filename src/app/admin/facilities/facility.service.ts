import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facility } from '../../shared/facility.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private facilities: Facility[] = [];
  private facilityChanged = new BehaviorSubject<Facility[]>([]);
  constructor(private http: HttpClient, private router: Router) { }

  getFacilities() {
    // ...
    this.http.get<{ facilities: Facility[] }>('http://localhost:3000/api/admin/facilities')
    .subscribe(
      responseData => {
        this.facilities = responseData.facilities;
        this.facilityChanged.next(this.facilities);
      }
    )
  }
  createFacilities(postData: Facility) {
    // ...
    this.http.post<{facility: Facility}>('http://localhost:3000/api/admin/facilities/create',postData)
    .subscribe(
      responseData => {
        this.facilities.push(responseData.facility);
        this.facilityChanged.next(this.facilities);
        this.router.navigateByUrl('/admin/facilities');
      }
    )
  }
  getFacilityStatusListener() {
    return this.facilityChanged.asObservable();
  }
  getFacility(facilityId: string) {
    return this.http.get<{facility: Facility}>('http://localhost:3000/api/admin/facility/' + facilityId);
  }
  deleteFacility(facilityId: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/admin/facilities/' + facilityId)
    .subscribe(responseData => {
      const getFacilities = this.facilities;
      const filterFacilities = getFacilities.filter(p => p._id !== facilityId);
      this.facilities = [...filterFacilities];
      this.facilityChanged.next(this.facilities);
      this.router.navigateByUrl('/admin/facilities');
    });
  }
}
