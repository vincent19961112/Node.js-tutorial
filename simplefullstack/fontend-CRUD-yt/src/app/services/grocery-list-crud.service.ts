import { ErrorHandlerService } from './error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Grocery } from '../models/Grocery';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GroceryListCrudService {

private url = 'http://localhost:3000/groceries';

httpOptions: { headers: HttpHeaders } = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private ErrorHandlerService: ErrorHandlerService, private http: HttpClient) { }


  fetchAll(): Observable<Grocery[]>{
    return this.http.get<Grocery[]>(this.url, {responseType: 'json'}).pipe(
      tap((_) => console.log('fetched groceries')), catchError(
        this.ErrorHandlerService.handlerError<Grocery[]>('fetchAll', [])
      )
    );
  }

  post(item: Partial<Grocery>): Observable<any>{
    return this.http.post<Partial<Grocery>>(this.url, item, this.httpOptions).pipe(
      catchError(
        this.ErrorHandlerService.handlerError<any>('post')
      )
    );
  }

  update(grocery: Grocery): Observable<any>{
    return this.http.put(this.url, grocery, this.httpOptions).pipe(
      catchError(
        this.ErrorHandlerService.handlerError<any>('update')
      )
    );
  }

  delete(id: number): Observable<any>{
   const url = `http://localhost:3000/groceries/${id}`;

   return this.http.delete<Grocery>(url, this.httpOptions).pipe(catchError(this.ErrorHandlerService.handlerError<any>('delete')));
  }


}
