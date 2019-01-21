import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {environment} from '../environments/environment';

const endpoint = environment.api_base_url;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  getCars(): Observable<any> {
    return this.http.get(endpoint + 'Cars/getCars').pipe(
      map(this.extractData));
  }

  getManufacturers(): Observable<any> {
    return this.http.get(endpoint + 'Manufacturer/getManufacturers').pipe(
      map(this.extractData));
  }

  getCarModelDetails(id): Observable<any> {
    return this.http.get(endpoint + 'Cars/getCarModelDetails/' + id).pipe(
      map(this.extractData));
  }

  addManufacturer (manufacturer): Observable<any> {
    console.log(manufacturer);
    return this.http.post<any>(endpoint + 'Manufacturer/addManufacturer', manufacturer, httpOptions).pipe(
      tap((manufacturer) => console.log(`added manufacturer`)),
      catchError(this.handleError<any>('addManufacturer'))
    );
  }

  addModel (modelData): Observable<any> {
    console.log(modelData);
    return this.http.post<any>(endpoint + 'Cars/addModel', modelData, httpOptions).pipe(
      tap((modelData) => console.log(`added model data`)),
      catchError(this.handleError<any>('addModel'))
    );
  }

  markModelSold (data): Observable<any> {
    console.log(data);
    return this.http.post<any>(endpoint + 'Cars/markSold', data, httpOptions).pipe(
      tap((data) => console.log(`Marked as sold.`)),
      catchError(this.handleError<any>('markModelSold'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
