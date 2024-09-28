import { Component } from '@angular/core';
import { ApiService } from '../../../serivce/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { room } from '../../../interface/chat';
import { SocketService } from '../../../serivce/socket.service';
import { CommonDataService } from '../../../serivce/common-data.service';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrl: './chat-bar.component.scss'
})
export class ChatBarComponent {

  constructor(
    private api: ApiService,
    private router: Router,
    private socket: SocketService,
    public route: ActivatedRoute,
    public commonData: CommonDataService
  ) { }

  chatRooms: room[] = [];
  profileDomain: string = this.api.domain;
  currentRoomId: string = '';
  ngOnInit() {
    this.api.getChatRooms().subscribe((val) => {
      this.chatRooms = val;
      this.joinAllRooms()
    })
  }

  startChat(roomid: string) {
    this.router.navigate(['base/chat', roomid])
  }

  joinAllRooms() {
    this.chatRooms.forEach((ele: room) => {
      this.socket.joinRoom(ele.id)
    })
  }
}
