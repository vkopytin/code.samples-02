import { Component } from '@angular/core';
import { SubscriptionItem, SubscriptionResponse } from './subscription.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss'
})
export class SubscriptionsComponent {
  domain = environment.catalog.domain;
  subscriptions: SubscriptionItem[] = [];
  total = 0;
  limit = 10;
  from = 0;
  page = 1;
  pages: number[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.loadSubscriptions();
  }

  async loadSubscriptions(): Promise<void> {
    const res$ = this.http.get<SubscriptionResponse>(`${this.domain}/youtube-api/list-channels?limit=${this.limit}&from=${this.from}`);
    const res = await lastValueFrom(res$);

    this.subscriptions = res.items;
    this.limit = res.limit;
    this.total = res.total;
    this.pages = Array(Math.ceil(this.total / this.limit)).fill(0).map((_, i) => i);
  }

  async goToPage(page: number): Promise<void> {
    this.from = (page - 1) * this.limit;
    this.page = page;
    await this.loadSubscriptions();
  }

  async subscribe(channelId: string): Promise<void> {
    const res$ = this.http.post(`${this.domain}/youtube-api/subscribe`, { channelId });
    await lastValueFrom(res$);
    this.loadSubscriptions();
  }

  async unsubscribe(channelId: string): Promise<void> {
    const res$ = this.http.post(`${this.domain}/youtube-api/unsubscribe`, { channelId });
    await lastValueFrom(res$);
    this.loadSubscriptions();
  }
}
