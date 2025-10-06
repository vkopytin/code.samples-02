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

  constructor(
    private http: HttpClient
  ) {
    this.loadSubscriptions();
  }

  async loadSubscriptions(): Promise<void> {
    const res$ = this.http.get<SubscriptionResponse>(`${this.domain}/youtube-api/list-channels`);
    const res = await lastValueFrom(res$);

    this.subscriptions = res.items;
  }
}
