import { element } from 'protractor';
import { ChatMessage } from './../models/chat-message.model';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ChatService } from './../services/chat.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges { 
  feed: ChatMessage[];

  constructor(private chat: ChatService) { }

  ngOnInit() {
    const x = this.chat.getMessages();
    x.snapshotChanges().subscribe(item => { 
      this.feed = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y["$key"] = element.key;
        this.feed.push(y as ChatMessage);
        console.log(this.feed);
      });
    });
    
    
  }

  ngOnChanges() {
    const x = this.chat.getMessages();
    x.snapshotChanges().subscribe(item => {
      this.feed = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y["$key"] = element.key;
        this.feed.push(y as ChatMessage);
        console.log(this.feed);
      });
    });
    
  }
}
