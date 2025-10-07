export interface SubscriptionItem {
  id: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  updatedAt: string;
}

export interface SubscriptionResponse {
  items: SubscriptionItem[];
}
