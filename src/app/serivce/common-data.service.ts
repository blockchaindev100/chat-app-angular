import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  currentRoomId: string = '';
  constructor() { }
}
