import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private router: Router) {
    try {
      const storedUser = localStorage.getItem('login_token');
      if (storedUser) {
        const parsed = JSON.parse(storedUser)
        this.userSubject.next(parsed)
        // console.log("local storage data parsing", parsed);
      }
    }
    catch (err) {
      // console.log("error parsing data from localstorage", err)
      localStorage.removeItem('login_token');
    }
  }


  private userSubject = new BehaviorSubject<any>(null)
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem('login_token', JSON.stringify(user))
    // console.log("auth item", item) // gives undefined;
  }


  getToken() {
    return localStorage.getItem('login_token');
  }

  getUser() {
    return this.userSubject.value;
  }


  isLoggedIn(): boolean {

    let res = this.userSubject.value;
    // console.log("is logged in status", res)
    return res;
  }

}
