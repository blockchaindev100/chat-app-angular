import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { ToolbarModule } from "../layouts/toolbar/toolbar.module";
import { MatCardModule } from '@angular/material/card';
import { ChatBarComponent } from './chat-bar/chat-bar.component';
import { MatDividerModule } from '@angular/material/divider';
import { TimePipe } from '../../pipes/time.pipe';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { MatIconModule } from '@angular/material/icon';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    BaseComponent,
    ChatBarComponent,
    TimePipe,
    ChatWindowComponent,
    UserdetailsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    ToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    PickerComponent,
    MatIconModule,
    MatTooltipModule,
    MatInputModule
  ]
})
export class BaseModule { }
