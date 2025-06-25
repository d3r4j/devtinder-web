import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  constructor(private service: LoginService) { }
  user: any[] = []
  ngOnInit(): void {
    this.service.feed().subscribe({
      next: (res) => {
        this.user = res;
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
