import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRequest } from '../interfaces/irequest';

@Injectable({
  providedIn: 'root'
})
export class InventoryrequestService {
  url: string = this.URL.getURL();

  constructor(
    private URL: UrlService,
    private http: HttpClient
  ) { }

  getAllRequests(): Observable<IRequest[]> {
    return this.http.get<IRequest[]>(
      `${this.url}/requests`
    );
  }

  getRequestById(id: number): Observable<IRequest> {
    return this.http.get<IRequest>(
      `${this.url}/requests/` + id
    );
  }


  add(request: IRequest): Observable<IRequest> {
    return this.http.post<IRequest>(
      `${this.url}/requests`, request
    );
  }

  update(id: number, request: IRequest): Observable<IRequest> {
    return this.http.put<IRequest>(
    `${this.url}/requests/` + id , request
    );
  }

  delete(id: number): Observable<IRequest> {
    return this.http.delete<IRequest>(
      `${this.url}/requests/` + id
    );
  }

}
