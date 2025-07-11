import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {
  constructor(private service: LoginService) { }

  connectionData: any;

  ngOnInit(): void {
    this.service.getConnections().subscribe({
      next: (res) => {
        this.connectionData = res.data;
        // console.log("connection ids", this.connectionData);
      },
      error: (err) => {
        alert("error getting user connections" + err);
      }
    })
  }
}
