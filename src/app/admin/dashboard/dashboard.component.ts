import { Component, OnInit } from '@angular/core';
import { GraphService } from './graph.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }
  barChartLabels = ['Facility', 'Student', 'Lecturer'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    // {data: [1,1,1], label: 'Academic Planning Unit'}
  ]
  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.graphService.getGraph();
    this.isLoading = true;
    this.graphService.getGraphStatusListener()
      .subscribe(responseData => {
        if(responseData){
          const newData = {
            data: [responseData.totalFacilities, responseData.totalStudents, responseData.totalLecturers],
            label: 'Academic Planning Unit'
          };
          this.isLoading=false;
          this.barChartData = [newData];
        }

      });
  }

}
