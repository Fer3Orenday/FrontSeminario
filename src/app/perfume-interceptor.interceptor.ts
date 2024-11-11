import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class PerfumeInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  private failedRequests = 0;
  private totalDuration = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = performance.now();
    this.totalRequests++;

    return next.handle(req).pipe(
      tap(
        () => {
          const duration = performance.now() - startTime;
          this.totalDuration += duration;
          console.log(`Request to ${req.url} took ${duration.toFixed(2)} ms.`);
        },
        error => {
          const duration = performance.now() - startTime;
          this.failedRequests++;
          this.totalDuration += duration;
          console.error(`Request to ${req.url} failed after ${duration.toFixed(2)} ms.`);
        }
      )
    );
  }
}
