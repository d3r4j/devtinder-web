import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../services/auth-user.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authUser: AuthUserService, private router: Router, private service: LoginService) { }
  logged_in_user: any

  ngOnInit(): void {
    this.authUser.user$.subscribe({
      next: (res) => {
        this.logged_in_user = res;

      }
    })
  }

  logout() {
    this.service.logout().subscribe({
      next: () => {
        // console.log("user is logged out using api");
        this.authUser.setUser(null);
        localStorage.removeItem('login_token');
        this.router.navigate(['/login'])

      }
    })

  }
}
