import { ArticleBlock } from "./articleBlock";

export interface ArticleDraft {
  id?: string;
  title: string;
  description: string;
  mediaId?: number;
  media?: ArticleBlock;
}
