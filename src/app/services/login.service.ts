import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://localhost:7777'

  login(emailId: string, password: string): Observable<any> {
    console.log("post api called ")
    return this.http.post<any>(this.BASE_URL + "/login", { emailId: emailId, password: password }, { withCredentials: true });
  }


  fetchUser(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/profile/view', { withCredentials: true })

  }

}
