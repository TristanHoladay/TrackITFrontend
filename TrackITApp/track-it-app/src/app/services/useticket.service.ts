import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { IjobTicket } from '../interfaces/ijob-ticket';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UseticketService {
  url: string = this.URL.getURL();

  constructor(
    private URL: UrlService,
    private http: HttpClient
  ) { }
  
  getAllTickets(): Observable<IjobTicket[]> {
    return this.http.get<IjobTicket[]>(
      `${this.url}/usetickets`
    );
  }

  getTicketById(id: number): Observable<IjobTicket> {
    return this.http.get<IjobTicket>(
      `${this.url}/usetickets/` + id
    );
  }


  add(ticket: IjobTicket): Observable<IjobTicket> {
    return this.http.post<IjobTicket>(
      `${this.url}/usetickets`, ticket
    );
  }

  update(id: number, ticket: IjobTicket): Observable<IjobTicket> {
    return this.http.put<IjobTicket>(
    `${this.url}/usetickets/` + id , ticket
    );
  }

  delete(id: number): Observable<IjobTicket> {
    return this.http.delete<IjobTicket>(
      `${this.url}/usetickets/` + id
    );
  }

}
