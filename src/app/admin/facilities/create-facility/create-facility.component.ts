import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacilityService } from '../facility.service';

@Component({
  selector: 'app-create-facility',
  templateUrl: './create-facility.component.html',
  styleUrls: ['./create-facility.component.css']
})
export class CreateFacilityComponent implements OnInit {
  facilityForm: FormGroup;
  isLoading = false;
  constructor(private facilityService: FacilityService) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.facilityForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'location': new FormControl(null, Validators.required),
      'seat_no': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'description': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if (!this.facilityForm.valid) {
      return;
    }
    const postData = {
      name: this.facilityForm.value.name,
      location: this.facilityForm.value.location,
      seat_no: this.facilityForm.value.seat_no,
      description: this.facilityForm.value.description
    }
    this.facilityService.createFacilities(postData);
  }
}
