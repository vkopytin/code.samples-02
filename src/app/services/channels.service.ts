import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { SubscriptionResponse } from '../catalog/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  domain = environment.catalog.domain;

  constructor(
    private http: HttpClient,
  ) { }

  loadSubscriptions(from=0, limit=10): Observable<SubscriptionResponse> {
    return this.http.get<SubscriptionResponse>(
      `${this.domain}/youtube-api/list-subscriptions?limit=${limit}&from=${from}`
    );
  }

  loadChannels(from=0, limit=10): Observable<SubscriptionResponse> {
    return this.http.get<SubscriptionResponse>(
      `${this.domain}/youtube-api/list-channels?limit=${limit}&from=${from}`
    );
  }

  subscribe(channelId: string) {
    return this.http.post(
      `${this.domain}/youtube-api/subscribe/${channelId}`
      ,
      {}
    ).pipe(
      tap(() => this.loadSubscriptions())
    );
  }

  unsubscribe(resourceId: string) {
    return this.http.post(
      `${this.domain}/youtube-api/unsubscribe/${resourceId}`
      ,
      {}
    ).pipe(
      tap(() => this.loadSubscriptions())
    );
  }
}
