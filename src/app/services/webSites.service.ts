import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { WebSiteModel } from './models/webSiteModel';

@Injectable({
  providedIn: 'root'
})
export class WebSitesService {
  domain: string = environment.catalog.domain;
  lastWebsites: WebSiteModel[] = [];
  profile: {selectedSiteId?: string} = {
    selectedSiteId: this.getCurrentSiteId()
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) { }

  getCurrentSiteId(): string | undefined {
    const params = new URLSearchParams(window.location.search);
    return params.get('currentSiteId') || undefined;
  }

  setCurrentSiteId(siteId: string) {
    const queryParams = { currentSiteId: siteId };
    this.router.navigate(
    [],
    {
      relativeTo: this.activatedRoute,
      queryParams,
    }
  );
  }

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
