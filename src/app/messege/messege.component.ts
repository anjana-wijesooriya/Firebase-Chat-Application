import { ChatMessage } from './../models/chat-message.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './messege.component.html',
  styleUrls: ['./messege.component.scss']
})
export class MessegeComponent implements OnInit {
 @Input() chatMessage: ChatMessage;
  userEmail: string;
  username: string;
  messageContent: string;
  timeStamp: Date = new Date();

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.username = chatMessage.username;
  }

}
