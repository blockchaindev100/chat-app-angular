import { Component } from '@angular/core';
import { ApiService } from '../../../serivce/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { message, room } from '../../../interface/chat';
import { SocketService } from '../../../serivce/socket.service';
import { CommonDataService } from '../../../serivce/common-data.service';
import { CONSTANTS } from '../../../constants/contant';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from '../search/search.component';

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
    public commonData: CommonDataService,
    private dialog: MatDialog
  ) { }

  chatRooms: room[] = [];
  profileDomain: string = this.api.domain;
  currentRoomId: string = '';
  userId: string = '';
  ngOnInit() {
    this.userId = localStorage.getItem(CONSTANTS.CHATIFY_USER_ID) as string;
    this.getAllRooms();
    this.commonData.newChatRoomNotify.subscribe((_) => {
      this.getAllRooms();
    })
    this.socket.onMessage().subscribe((val: message) => {
      const roomId = val.roomId;
      const index = this.chatRooms.findIndex((val: room) => {
        return val.id === roomId
      });
      if (val.senderId !== this.userId) this.chatRooms[index].messages.push(val);
    })
  }

  startChat(roomid: string) {
    const index = this.chatRooms.findIndex((val: room) => {
      return val.id === roomid
    });
    this.chatRooms[index].messages = this.chatRooms[index].messages.slice(1);
    this.router.navigate(['base/chat', roomid])
  }

  getAllRooms() {
    this.api.getChatRooms().subscribe((val) => {
      this.chatRooms = val;
      this.joinAllRooms()
    })
  }

  joinAllRooms() {
    this.chatRooms.forEach((ele: room) => {
      this.socket.joinRoom(ele.id)
    })
  }

  openSearch(){
    this.dialog.open(SearchComponent)
  }
}
