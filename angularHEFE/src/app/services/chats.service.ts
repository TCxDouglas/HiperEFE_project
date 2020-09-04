import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { Room } from '../models/room';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';


@Injectable()
export class ChatsService {

  public messages: Observable<Message[]>;
  public message: Observable<Message[]>;
  public rooms: Observable<Room[]>;
  public roomsCollection: AngularFirestoreCollection;
  public msgCollection: AngularFirestoreCollection;
  public user: Observable<any>;

  constructor(private bd: AngularFirestore, private _snackBar: MatSnackBar) {

  }

  getRooms(user) {
    if (user.cuenta == 'Docente') {
      this.roomsCollection = this.bd.collection(`users/${user.uid}/salas`);
    } else {
      this.roomsCollection = this.bd.collection(`users/${user.uid}/joinRoom`);
    }

    return this.rooms = this.roomsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Room;
        data.id = a.payload.doc.id;
        return data;
      })
    }));


  }
  getLastMessage(room) {
    this.msgCollection = this.bd.collection(`rooms/${room}/chat`, ref => ref.orderBy('date').limit(1));
    return this.message = this.msgCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Message;
        return data;
      })
    }));
  }

  getUserMsg(uid) {
    return this.bd.collection(`users`).doc(uid).valueChanges();
  }

  getFullMessages(room) {

    this.msgCollection = this.bd.collection(`rooms/${room}/chat/` , ref => ref.orderBy('date'));
    //return this.messages =this.msgCollection.valueChanges();
    return this.messages = this.msgCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Message;
        data.id = data.id
        return data;
      })
    }));

  }

 sendMessage(msg, room){
   this.msgCollection = this.bd.collection(`rooms/${room}/chat/`);
   this.msgCollection.add(msg).then(resp =>
     console.log('enviado')
   ).catch(err => console.log(err));
 }

}