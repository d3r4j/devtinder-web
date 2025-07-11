import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(private activeRoutes: ActivatedRoute, private socketservice: SocketService, private service: LoginService) { }
  userId: any;
  loggedInUserData: any;
  targetUserId: any;
  messages: { firstName: string, lastName: string, text: string }[] = []
  userMessage: any;

  ngOnInit(): void {
    this.socketservice.connect()
    //getting IDs of users
    this.targetUserId = this.activeRoutes.snapshot.params['targetUserId']
    this.service.fetchUser().subscribe({
      next: (res) => {
        this.loggedInUserData = res;
        this.userId = res._id
        // console.log("logged user data", this.loggedInUserData)
        // console.log("logged in user id", this.userId);
        // console.log("target user id", this.targetUserId);

        // emit join chat
        this.socketservice.joinChat(this.loggedInUserData.firstName, this.userId, this.targetUserId);
        //recieved message
        this.socketservice.messageRecieved((data) => {
          this.messages.push(data)
        })

        // fetching chat 
        this.service.fetchChat(this.targetUserId).subscribe({
          next: (res) => {
            this.messages = res.messages.map((msg: any) => ({
              firstName: msg.senderId?.firstName,
              lastName: msg.senderId.lastName,
              text: msg.text
            }))

            // console.log("chat fetch res", res)
            // console.log("mssgr=es", this.messages)
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })



  }
  sendMessage() {
    this.socketservice.sendMessage(this.loggedInUserData.firstName, this.userId, this.targetUserId, this.userMessage);
    this.userMessage = '';
  }



  ngOnDestroy(): void {
    this.socketservice.disconnect()
  }
}
