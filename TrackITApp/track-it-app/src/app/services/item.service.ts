import { Injectable } from '@angular/core';
import { Iitem } from '../interfaces/iitem';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url: string = this.URL.getURL();

  constructor(
    private URL: UrlService,
    private http: HttpClient
  ) { }

  getAllItems(id: number): Observable<Iitem[]> {
    return this.http.get<Iitem[]>(
      `${this.url}/companies/${id}/resources`
    );
  }

  getItemById(id: number): Observable<Iitem> {
    return this.http.get<Iitem>(
      `${this.url}/resources/` + id
    );
  }

  getItemByRT(id: number): Observable<Iitem[]> {
    return this.http.get<Iitem[]>(
      `${this.url}/resourcetype/${id}/items`
    );
  }

  add(item: Iitem): Observable<Iitem> {
    return this.http.post<Iitem>(
      `${this.url}/resources`, item
    );
  }

  update(id: number, item: Iitem): Observable<Iitem> {
    return this.http.put<Iitem>(
    `${this.url}/resources/` + id , item
    );
  }

  delete(id: number): Observable<Iitem> {
    return this.http.delete<Iitem>(
      `${this.url}/resources/` + id
    );
  }

}
