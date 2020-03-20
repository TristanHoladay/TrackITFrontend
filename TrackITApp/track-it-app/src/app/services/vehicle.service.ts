import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ivehicles } from '../interfaces/ivehicles';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  url: string = this.URL.getURL();

  constructor(
    private URL: UrlService,
    private http: HttpClient
  ) { }

  getAllVehicles(): Observable<Ivehicles[]> {
    return this.http.get<Ivehicles[]>(
      `${this.url}/vehicles`
    );
  }

  getVehicleById(id: number): Observable<Ivehicles> {
    return this.http.get<Ivehicles>(
      `${this.url}/vehicles/` + id
    );
  }


  add(vehicle: Ivehicles): Observable<Ivehicles> {
    return this.http.post<Ivehicles>(
      `${this.url}/vehicles`, vehicle
    );
  }

  update(id: number, vehicle: Ivehicles): Observable<Ivehicles> {
    return this.http.put<Ivehicles>(
    `${this.url}/vehicles/` + id , vehicle
    );
  }

  delete(id: number): Observable<Ivehicles> {
    return this.http.delete<Ivehicles>(
      `${this.url}/vehicles/` + id
    );
  }


}
