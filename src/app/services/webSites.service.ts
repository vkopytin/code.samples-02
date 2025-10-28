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
  lastWebsites: WebSiteModel[] = [];
  profile: {selectedSiteId?: string} = {};

  constructor(private http: HttpClient) { }

  listWebSites(): Observable<WebSiteModel[]> {
    return this.http.get<WebSiteModel[]>(`${this.domain}/sites/list`).pipe(
      tap(res => this.lastWebsites = res)
    );
  }

  selectWebSite(siteId: string): Observable<WebSiteModel> {
    return this.http.post<WebSiteModel>(`${this.domain}/sites/select`,  {siteId});
  }

  getProfile(): Observable<{selectedSiteId?: string}> {
    return this.http.get<{selectedSiteId?: string}>(`${this.domain}/sites/profile`);
  }

  setParent(siteId: string | null, parentId: string | null): Observable<void> {
    return this.http.post<void>(`${this.domain}/sites/${siteId}/set-parent`, {parentId});
  }

  updateWebSite(site: WebSiteModel): Observable<WebSiteModel> {
    return this.http.put<WebSiteModel>(`${this.domain}/sites/${site.id}`, site);
  }
}
