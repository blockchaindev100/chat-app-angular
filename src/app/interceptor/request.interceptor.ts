import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from '../serivce/common-data.service';
import { NgZone } from '@angular/core';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const cloneReq = req.clone({
    setHeaders: {
      'Authorization': 'Bearer ' + localStorage.getItem('chatifyToken')
    }
  });

  const router: Router = inject(Router);
  const common: CommonDataService = inject(CommonDataService);
  const ngZone: NgZone = inject(NgZone);

  return next(cloneReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        ngZone.run(() => {
          common.currentRoomId = '';
          router.navigate(['auth/login']);
        });
      }

      return throwError(() => error);
    })
  );
};
