import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../serivce/api.service';
import { message, room } from '../../../interface/chat';
import { CONSTANTS } from '../../../constants/contant';
import { SocketService } from '../../../serivce/socket.service';
import { FormControl, Validators } from '@angular/forms';
import { CommonDataService } from '../../../serivce/common-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserdetailsComponent } from '../userdetails/userdetails.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  roomId: string = '';
  roomDetails: room = {
    id: '',
    isGroupChat: 'false',
    createdAt: '',
    participants: [
      {
        user: {
          email: '',
          firstName: '',
          id: '',
          lastName: '',
          profile: ''
        }
      }
    ],
    messages: []
  };
  message: message[] = [];
  userId: string = '';
  messageInput: FormControl = new FormControl("", Validators.required);
  showEmojiPicker: boolean = false;
  @ViewChild('msgContainer') msgContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public api: ApiService,
    private socket: SocketService,
    private cdRef: ChangeDetectorRef,
    private commonData: CommonDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get("id") as string;
      this.commonData.currentRoomId = this.roomId;
      this.userId = localStorage.getItem(CONSTANTS.CHATIFY_USER_ID) as string;
      this.fetchRoomDetails();
      this.fetchMessages();
      this.newMessages();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  fetchRoomDetails(): void {
    this.api.getRoomDetails(this.roomId).subscribe((val) => {
      this.roomDetails = val.data;
    });
  }

  fetchMessages(): void {
    this.api.getMessageByRoomId(this.roomId).subscribe((val: message[]) => {
      this.message = val;
      this.scrollToBottom();
    });
  }

  newMessages(): void {
    this.socket.onMessage().subscribe((val: message) => {
      if (this.message[this.message.length - 1]?.id !== val.id) {
        this.message.push(val);
        this.cdRef.detectChanges();
        this.scrollToBottom();
      }
    });
  }

  addEmoji(event: any) {
    if (event.emoji.native !== null && event.emoji.native !== "null")
      this.messageInput.setValue((this.messageInput.value) ? this.messageInput.value : "" + event.emoji.native);
  }

  sendMessage(): void {
    if (this.messageInput.value.trim() !== "") {
      this.socket.sendMessage(this.roomId, this.userId, this.messageInput.value);
      this.messageInput.reset();
    }
  }

  scrollToBottom(): void {
    try {
      if (this.msgContainer) {
        this.msgContainer.nativeElement.scrollTop = this.msgContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  openProfile() {
    this.dialog.open(UserdetailsComponent, {
      data: {
        id: this.roomDetails.participants[0].user.id
      }
    })
  }
}
