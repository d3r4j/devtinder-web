import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-root-redirect',
  templateUrl: './root-redirect.component.html',
  styleUrls: ['./root-redirect.component.css']
})
export class RootRedirectComponent implements OnInit {
  constructor(private router: Router, private auth: AuthUserService) { }


  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/feed'])
    }

    else {
      this.router.navigate(['/login'])
    }
  }

}
