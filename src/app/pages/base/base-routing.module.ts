import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base.component';
import { validUserGuard } from '../../guards/valid-user.guard';
import { ChatWindowComponent } from './chat-window/chat-window.component';

const routes: Routes = [
  {
    path: '',
    component:BaseComponent,
    canActivate:[validUserGuard],
    canActivateChild:[validUserGuard],
    children: [
      {
        path: 'chat/:id',
        component: ChatWindowComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
