import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handlerError<T>(operation = 'operation', result?: T){
  return (error: any): Observable<T> => {
    console.log(`${operation} failed:${error.message}`);
    return of(result as T);
    };
  }

}
