import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ChannelsService } from '../../services/channels.service';
import { SubscriptionItem } from './subscription.model';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [NgTemplateOutlet, RouterModule, RouterOutlet],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss'
})
export class SubscriptionsComponent {
  subscriptions: SubscriptionItem[] = [];
  total = 0;
  limit = 10;
  from = 0;
  page = 1;
  pages: number[] = [];

  constructor(
    private channels: ChannelsService
  ) {
    this.loadSubscriptions();
  }

  async goToPage(page: number): Promise<void> {
    this.from = (page - 1) * this.limit;
    this.page = page;
    await this.loadSubscriptions();
  }

  async loadSubscriptions(): Promise<void> {
    const res = await lastValueFrom(
      this.channels.loadSubscriptions(this.from, this.limit)
    );

    this.subscriptions = res.items;
    this.limit = res.limit;
    this.total = res.total;
    this.pages = Array(Math.ceil(this.total / this.limit)).fill(0).map((_, i) => i);
  }

  async subscribe(channelId: string): Promise<void> {
    await lastValueFrom(this.channels.subscribe(channelId));
    this.loadSubscriptions();
  }

  async unsubscribe(resourceId: string): Promise<void> {
    await lastValueFrom(this.channels.unsubscribe(resourceId));
    this.loadSubscriptions();
  }
}
