import { Component } from '@angular/core';
import { ApiService } from '../../../serivce/api.service';
import { user } from '../../../interface/chat';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  users: user[] = [];
  searchInput: FormControl = new FormControl("");

  constructor(
    public api: ApiService
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
      console.log("users", this.users);
    })
  }
}
