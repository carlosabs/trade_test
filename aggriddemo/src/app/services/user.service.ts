import { Injectable } from '@angular/core';
import { Trade } from '../model/trade';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string = "http://localhost.fiddler:49850/Api/User/";
  idCounterparty:number = 0;

  constructor(private http : HttpClient) { 
  }

   editUser(user: Trade){
    return this.http.put(this.apiUrl+ 'UpdateEmployeeDetails/', user );
  }

  getUsers(): Observable<Trade[]> {  
    return this.http.get<Trade[]>(`${this.apiUrl}GetUserDetails`);
  }  
   
  addUser(user: Trade): Observable<string> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<string>(`${this.apiUrl}/InsertUserDetails/`, user, httpOptions);  
  }  
  
  updateUser(user: Trade): Observable<string> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<string>(`${this.apiUrl}/UpdateEmployeeDetails/`, user, httpOptions);  
  }  

  deleteUser(userId: string): Observable<string> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<string>(`${this.apiUrl}/DeleteUserDetails?id=` + userId, httpOptions);
  }
 
}