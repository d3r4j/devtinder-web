import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {
  constructor(private service: LoginService) { }

  userReq: any;


  ngOnInit(): void {
    this.service.getRequests().subscribe({
      next: (res) => {
        this.userReq = res.data
        console.log(this.userReq)
      },
      error: (err) => {
        alert("error fetching user requests" + err);
      }
    })
  }
}
