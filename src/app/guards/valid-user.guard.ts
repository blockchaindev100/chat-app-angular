import { CanActivateChildFn, Router } from '@angular/router';
import { CONSTANTS } from '../constants/contant';
import { inject } from '@angular/core';

export const validUserGuard: CanActivateChildFn = (childRoute, state) => {
  const token = localStorage.getItem(CONSTANTS.CHATIFY_TOKEN);
  if (token) {
    return true;
  }
  inject(Router).navigate(["/auth"]);
  return false;
};
