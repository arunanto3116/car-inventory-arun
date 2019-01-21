import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  toastDefaultOptions:any = [{maxWidth: null,position:'topRight'}];
  constructor() { }

  getToastParams(): Observable<any> {    
    return this.toastDefaultOptions;
  }  
}
