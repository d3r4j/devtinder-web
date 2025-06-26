import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {
  constructor(private service: LoginService) { }

  userReq: any;

  loggedInUser: any;
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

    this.service.userRequestReceived().subscribe({
      next: (res) => {
        this.loggedInUser = res.data;
        console.log('user req received', this.loggedInUser)
      }
    })

  }

  onAccept(event: any) {
    console.log(event)
    this.service.userRequestStatus('accepted', event).subscribe({
      next: (res) => {
        console.log(" request accepted", res)
        this.refreshReqPage()

      },
      error: (err) => {
        console.log("error accepting user request", err);
      }
    })
  }

  onReject(event: any) {
    console.log('on reject', event)
    this.service.userRequestStatus('rejected', event).subscribe({
      next: (res) => {
        console.log('user rejected', res)
        this.refreshReqPage()

      },
      error: (err) => {
        console.log('error rejecting user', err)
      }
    })
  }


  // refreshing page after button clicked

  refreshReqPage() {
    this.service.getRequests().subscribe({
      next: (res) => {
        this.userReq = res.data;
        console.log(' page refreshed', this.userReq)
      },
      error: (err) => {

      }
    })
  }


}
