import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { message } from '../interface/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  domain: string = 'http://localhost:3000'
  socket!: any;

  constructor() {
    this.socketConnection();
  }

  private socketConnection() {
    this.socket = io(this.domain);
    this.socket.on('connect', () => {
      console.log('Connected to the socket server', this.socket.id);
    })
    this.socket.on('disconnect', () => {
      console.log('Disconnected from the socket server', this.socket.id);
    })
  }

  joinRoom(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
  }

  sendMessage(roomId: string, senderId: string, content: string): void {
    this.socket.emit('sendMessage', { roomId, senderId, content })
  }

  onMessage(): Observable<message> {
    return new Observable(observer => {
      this.socket.on('newMessage', (msg: message) => {
        observer.next(msg);
      })
    })
  }
}
