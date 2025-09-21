export interface ArticleBlock {
    id?: string;
    title: string;
    description: string;
    media?: ArticleBlock;
    image?: string;
    origin?: string;
    sourceUrl?: string;
    width?: number;
    height?: number;
    mediaError?: string;
}
