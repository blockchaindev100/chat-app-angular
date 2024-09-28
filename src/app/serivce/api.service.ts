import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginDetails, signupDetails } from '../interface/login';
import { user } from '../interface/chat';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  domain: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  login(loginDetails: loginDetails): Observable<any> {
    return this.http.post(`${this.domain}/user/login`, loginDetails)
  }

  signup(signupDetails: signupDetails): Observable<any> {
    return this.http.post(`${this.domain}/user/signup`, signupDetails);
  }

  getChatRooms(): Observable<any> {
    return this.http.get(`${this.domain}/chat/room`);
  }

  getMessageByRoomId(roomId: string): Observable<any> {
    return this.http.get(`${this.domain}/chat/room/${roomId}/message`)
  }

  getRoomDetails(roomId: string): Observable<any> {
    return this.http.get(`${this.domain}/chat/room/${roomId}`)
  }

  getUserDetailsById(userId: string): Observable<any> {
    return this.http.get(`${this.domain}/user/${userId}`)
  }

  searchUsers(query: string): Observable<any> {
    return this.http.get(`${this.domain}/user/search?query=${query}`);
  }
}
