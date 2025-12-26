import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ChannelsService } from '../../services/channels.service';
import { SubscriptionItem } from '../subscription.model';

@Component({
    selector: 'app-channels',
    imports: [NgTemplateOutlet, RouterModule],
    templateUrl: './channels.component.html',
    styleUrl: './channels.component.scss'
})
export class ChannelsComponent implements OnInit {
  subscriptions = this.channels.lastChannels;
  total = 0;
  limit = 10;
  from = 0;
  page = 1;
  pages: number[] = [];

  constructor(
    private channels: ChannelsService
  ) {}

  ngOnInit(): void {
    this.loadChannels();
  }

  async goToPage(page: number): Promise<void> {
    this.from = (page - 1) * this.limit;
    this.page = page;
    await this.loadChannels();
  }

  async loadChannels(): Promise<void> {
    const res = await lastValueFrom(
      this.channels.loadChannels(this.from, this.limit)
    );

    this.subscriptions = res.items;
    this.limit = res.limit;
    this.total = res.total;
    this.pages = Array(Math.ceil(this.total / this.limit)).fill(0).map((_, i) => i);
  }

  async subscribe(channelId: string): Promise<void> {
    await lastValueFrom(this.channels.subscribe(channelId));
    this.loadChannels();
  }

  async unsubscribe(resourceId: string): Promise<void> {
    await lastValueFrom(this.channels.unsubscribe(resourceId));
    this.loadChannels();
  }
}
