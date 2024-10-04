import { Component } from '@angular/core';
import { ApiService } from '../../../serivce/api.service';
import { room, user } from '../../../interface/chat';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { CommonDataService } from '../../../serivce/common-data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  users: user[] = [];
  searchInput: FormControl = new FormControl("");

  constructor(
    public api: ApiService,
    public common: CommonDataService,
    private router: Router,
    private dialogRef: MatDialogRef<SearchComponent>
  ) { }

  ngOnInit() {
    this.searchInput.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => {
        if (query.trim()) {
          return this.api.searchUsers(query);
        }
        return of({ data: [] });
      })
    ).subscribe(val => {
      this.users = (val && val.data) ? val.data : [];
    })
  }

  openChat(userid: string) {
    this.api.getOrCreateRoom(userid).subscribe((val: room) => {
      this.common.currentRoomId = val.id;
      this.router.navigate(['base/chat', val.id]);
      this.common.newChatRoomNotify.next("");
      this.dialogRef.close();
    })
  }
}
