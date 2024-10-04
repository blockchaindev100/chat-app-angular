import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  currentRoomId: string = '';
  newChatRoomNotify: Subject<string> = new Subject();
  constructor() { }
}
