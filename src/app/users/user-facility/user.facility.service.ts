import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Facility } from '../../shared/facility.model';

@Injectable({
  providedIn: 'root'
})
export class UserFacilityService {
  private facilities: Facility[] = [];
  private facilityChanged = new BehaviorSubject<Facility[]>([]);
  constructor(private http: HttpClient, private router: Router) { }

  getFacilities() {
    // ...
    this.http.get<{ facilities: Facility[] }>('http://localhost:3000/api/user/facilities')
    .subscribe(
      responseData => {
        this.facilities = responseData.facilities;
        this.facilityChanged.next(this.facilities);
      }
    )
  }
  getFacilityStatusListener() {
    return this.facilityChanged.asObservable();
  }
  getFacility(facilityId: string) {
    // ...
    return this.facilities.find(p => p._id === facilityId);
  }
}
