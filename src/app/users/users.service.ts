import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface User {
  __id?: string,
  name: string,
  address: string,
  email: string,
  password?: string,
  phone_no: number,
  rank: string,
  department: string
  __v?: any
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
    user: User;
    constructor(private http: HttpClient) {}

    getUser() {
      return this.http.get<{user: User}>('http://localhost:3000/api/user/profile');
    }

    updateUser(postData: {name: string, rank: string, password: string, new_password: string}) {
      return this.http.post<{user: User}>('http://localhost:3000/api/user/profile', postData);
    }
}
