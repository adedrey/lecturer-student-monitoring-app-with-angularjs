import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
export interface Graph { totalStudents: number, totalFacilities: number, totalLecturers: number };
@Injectable({
  providedIn: 'root'
})
export class UserGraphService {
  private graph: Graph;
  private graphChanged = new BehaviorSubject<Graph>(null);
  constructor(private http: HttpClient) { }

  getGraph() {
    this.http.get<{ graph: Graph }>('http://localhost:3000/api/user/get-graph')
      .subscribe(responseData => {
        this.graphChanged.next(responseData.graph);
      });
  }

  getGraphStatusListener() {
    return this.graphChanged.asObservable();
  }
}
