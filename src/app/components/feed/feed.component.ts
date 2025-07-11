import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
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
        // console.log(this.user)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onInterested(event: any) {
    console.log(event);
    this.service.sendConnectionRequest('interested', event).subscribe({
      next: (res) => {
        // console.log("interested button clicked", res);
        this.service.clearFeedCache()
        this.refreshFeed()

      },
      error: (err) => {
        console.log("error in interested button working", err)
      }
    })
  }

  onIgnored(event: any) {
    // console.log(event)
    this.service.sendConnectionRequest('ignored', event).subscribe({

      next: (res) => {
        // console.log("user ignored button working", res)
        this.service.clearFeedCache();
        this.refreshFeed()

      },
      error: (err) => {
        console.log("error in sending ignore request", err)
      }
    })
  }

  refreshFeed() {
    this.service.feed().subscribe({
      next: (res) => {
        this.user = res;
        // console.log("refresh feed called ", this.user)

      },
      error: (err) => {
        console.log("error calling refresh feed", err);
      }
    })
  }


}
