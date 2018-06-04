import { Injectable } from '@angular/core';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { ChatMessage } from './../models/chat-message.model';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { User } from './../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  username: string;
  ChatMessages: AngularFireList<any>;
  ChatMessage: ChatMessage;
  
  constructor( private db: AngularFireDatabase, private afAuth: AngularFireAuth ) {

    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().subscribe(a => { 
        this.username = a.displayName;
      });
    });
  }
  
  getUser() { 
    const userId = this.user.uid;
    const path = '/users/' + userId;
    return (this.db.object(path).valueChanges());
  }

  getUsers() { 
    const path = '/users/';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.ChatMessages = this.getMessages();
    this.ChatMessages.push({
      message: msg,
      timeSent: timestamp,
      username: this.username,
      email: email
    });
    console.log('Called sendMessage()!');
  }

  getMessages(): AngularFireList<any> { 
    //query to create message feed binding
    return this.db.list('messages', msgs => msgs.limitToLast(25).orderByKey());
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                (now.getUTCMonth() + 1) + '/' +
                now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                  now.getUTCMinutes() + ':' +
      now.getUTCSeconds();
    
    return (date + ' ' + time);
  }
}
