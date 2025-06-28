import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  BASE_URL = '/api'
  private cacheFeed: any = null;



  login(emailId: string, password: string): Observable<any> {
    // console.log("post api called ")
    return this.http.post<any>(this.BASE_URL + "/login", { emailId: emailId, password: password }, { withCredentials: true });
  }


  fetchUser(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/profile/view', { withCredentials: true })

  }

  logout() {
    return this.http.post(this.BASE_URL + '/logout', {}, { withCredentials: true, responseType: 'text' as 'json' },)
  }


  feed(): Observable<any> {
    if (this.cacheFeed) {
      return of(this.cacheFeed); // avoids refetching and recalling api again when clicked home
    }
    return this.http.get<any>(this.BASE_URL + '/feed', { withCredentials: true }).pipe(
      tap(res => { this.cacheFeed = res })
    )

  }
  clearFeedCache() {
    this.cacheFeed = null
  }



  userProfileEdit(updatedData: any): Observable<any> {
    const { photoUrl, age, gender, about, skills, firstName, lastName } = updatedData;
    // console.log("path api logs", updatedData)
    return this.http.patch(this.BASE_URL + '/profile/edit',
      { photoUrl, age, gender, about, skills, firstName, lastName },
      { withCredentials: true })
  }

  //user connection api 
  getConnections(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/user/connections', { withCredentials: true })
  }

  //user request recieved
  getRequests(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/user/requests/received', { withCredentials: true })
  }

  userRequestReceived(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/user/requests/received', { withCredentials: true })
  }

  userRequestStatus(status: string, _id: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL + '/request/review/' + status + '/' + _id, {}, { withCredentials: true })
  }

  // feed api to send or ignore user profiles 
  sendConnectionRequest(action: string, _id: any): Observable<any> {
    return this.http.post(this.BASE_URL + '/request/send/' + action + '/' + _id, {}, { withCredentials: true })
  }


  signupUser(user: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL + "/signup", user, { withCredentials: true })
  }

}   
