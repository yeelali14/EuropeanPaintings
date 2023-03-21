import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url, httpOptions)
    .pipe(
      finalize(() => {
        //TODO: loading
      }),
      catchError((err) => {
        return this.handleError(err);
      }));
  }

  private handleError(error: HttpErrorResponse) {
    console.log('dasda');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured
      console.error('An error occurred:', error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
  
}
//dasdas