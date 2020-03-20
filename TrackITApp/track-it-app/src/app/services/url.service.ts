import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  URL: string;

  constructor() { }

  getURL() {
    this.URL = "https://trackitapi.azurewebsites.net/api";
    //this.URL = "https://localhost:44314/api";
    return this.URL;
  }
}
