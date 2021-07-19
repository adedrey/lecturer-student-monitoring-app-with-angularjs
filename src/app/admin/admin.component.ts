import { Component, OnInit } from '@angular/core';
import { GraphService } from './dashboard/graph.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private graphService: GraphService) { }


  ngOnInit() {
    // this.graphService.getGraph()
  }

}
