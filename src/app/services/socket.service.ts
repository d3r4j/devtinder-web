import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket?: Socket
  private readonly BASE_URL = 'http://localhost:7777'

  constructor() {
    //creating a connnection
    if (window.location.hostname === 'localhost') {
      this.socket = io(this.BASE_URL, { withCredentials: true })
    }
    else {
      this.socket = io('/', { path: '/api/socket.io', withCredentials: true })
    }


  }

  // emit "join chat event"
  joinChat(firstName: string, userId: string, targetUserId: string) {
    // console.log("✅ Socket connected");
    this.socket?.emit('joinChat', { firstName, userId, targetUserId });
  }

  sendMessage(firstName: string, userId: string, targetUserId: string, text: string) {
    this.socket?.emit('sendMessage', { firstName, userId, targetUserId, text })
  }

  messageRecieved(callback: (data: { firstName: string, lastName: string, text: string }) => void) {
    this.socket?.on("messageReceived", callback)
  }

  disconnect() {
    this.socket?.disconnect()
  }

  connect() {
    this.socket?.connect()
  }

}
