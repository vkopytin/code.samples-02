import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { WebSiteModel } from './models/webSiteModel';

@Injectable({
  providedIn: 'root'
})
export class WebSitesService {
  domain: string = environment.catalog.domain;
  lastWebsites?: WebSiteModel[];

  constructor(private http: HttpClient) { }

  listWebSites(): Observable<WebSiteModel[]> {
    return this.http.get<WebSiteModel[]>(`${this.domain}/sites/list`).pipe(
      tap(res => this.lastWebsites = res)
    );
  }
}
