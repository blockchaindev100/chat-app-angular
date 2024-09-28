import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../serivce/api.service';
import { user } from '../../../interface/chat';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    public api: ApiService
  ) { }

  userDetails!: user;

  ngOnInit() {
    this.api.getUserDetailsById(this.data.id).subscribe((val: any) => {
      this.userDetails = val.data;
    })
  }

}
