import { Component, OnInit } from '@angular/core';
import { UserGraphService } from '../user-dashboard/user.graph.service';

@Component({
  selector: 'app-user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css']
})
export class UserGraphComponent implements OnInit {
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
  constructor(private graphService: UserGraphService) { }

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
          this.isLoading = false;
          this.barChartData = [newData];
        }

      });
  }

}
