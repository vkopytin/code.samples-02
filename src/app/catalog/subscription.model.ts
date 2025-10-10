export interface SubscriptionItem {
  id: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  updatedAt: string;
  isSubscribed: boolean;
}

export interface SubscriptionResponse {
  items: SubscriptionItem[];
  limit: number;
  total: number;
}
