import { Component, TemplateRef, ViewChild } from '@angular/core';
import { user } from '../../../interface/chat';
import { ApiService } from '../../../serivce/api.service';
import { CONSTANTS } from '../../../constants/contant';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonDataService } from '../../../serivce/common-data.service';
import { UserdetailsComponent } from '../../base/userdetails/userdetails.component';
import { SearchComponent } from '../../base/search/search.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  userDetails!: user;
  constructor(
    public api: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private common: CommonDataService,
  ) { }

  ngOnInit() {
    this.api.getUserDetailsById(localStorage.getItem(CONSTANTS.CHATIFY_USER_ID) as string).subscribe((val: any) => {
      this.userDetails = val.data;
    })
  }

  logOut() {
    this.common.currentRoomId = '';
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }

  openProfile() {
    this.dialog.open(UserdetailsComponent, {
      data: {
        id: this.userDetails.id
      }
    });
  }

  search() {
    this.dialog.open(SearchComponent);
  }

  ngOnDestroy() {
    this.dialog.closeAll();
  }
}
