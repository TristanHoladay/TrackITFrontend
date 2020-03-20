import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: object = {};
  
  private dataSub = new BehaviorSubject<object>(this.data);
  currentData = this.dataSub.asObservable();

  constructor() { }

  changeDataSub(newDat: object) {
    this.dataSub.next(newDat);
  }

}
