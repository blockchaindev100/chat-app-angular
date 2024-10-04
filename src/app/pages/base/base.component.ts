import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonDataService } from '../../serivce/common-data.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  constructor(
    public common:CommonDataService
  ) { }

}
