export interface SnippetThumbnails {
  default: { url: string; };
  medium: { url: string; };
  high: { url: string; };
}

export interface SubsSnippet {
  title: string;
  description: string;
  thumbnails: SnippetThumbnails
}

export interface SubscriptionItem {
  id: string;
  snippet: SubsSnippet;
}

export interface SubscriptionResponse {
  items: SubscriptionItem[];
}

