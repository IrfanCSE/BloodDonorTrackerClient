import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private acc: AccountService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('emailExists')) {
      this.spinner.show();
    }

    return next.handle(request).pipe(
      // delay(1000),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
