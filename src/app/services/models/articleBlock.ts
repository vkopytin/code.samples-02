export interface ArticleBlock {
    id?: string;
    title: string;
    description: string;
    media?: ArticleBlock;
    image?: string;
    sourceUrl?: string;
    width?: number;
    height?: number;
}
