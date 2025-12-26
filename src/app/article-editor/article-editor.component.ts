import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { ContentEditorModule } from '../content-editor/content-editor.module';
import { ArticlesService } from '../services/articles.service';
import { ArticleDraft } from '../services/models/articleDraft';
import { ArticleMediaComponent } from './article-media/article-media.component';
import { WebSitesService } from '../services/webSites.service';
import { WebSiteModel } from '../services/models/webSiteModel';
import { ArticleBlock } from '../services/models/articleBlock';

@Component({
    selector: '[article-editor]',
    imports: [ArticleMediaComponent, ContentEditorModule],
    templateUrl: './article-editor.component.html',
    styleUrl: './article-editor.component.scss'
})
export class ArticleEditorComponent implements OnInit{
  defaultArticleDraft: ArticleDraft = {
    title: '',
    description: '',
  };
  private _article = {} as ArticleBlock;
  @Input('article-editor') get article(): ArticleBlock {
    return this._article;
  }
  set article(value: ArticleBlock) {
    this._article = value || this.defaultArticleDraft;
  }
  isLoading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly articles: ArticlesService,
    public readonly webSites: WebSitesService,
  ) {}

  ngOnInit(): void {
    this.loadArticle();
  }

  async loadArticle(): Promise<void> {
    const articleId = this.route.snapshot.paramMap.get('articleId');

    if (!articleId) {
      console.error('No articleId provided to ArticleEditorComponent');
      return;
    }

    const res$ = this.articles.getById(articleId);
    const article = await lastValueFrom(res$);
    this.article = article;
    this.isLoading = false;
  }

  togglePrintMediaView(): void {
    const src = this.article.media?.sourceUrl;
    window.open(src, "_new");
  }

  onTitleChange(newTitle: string): void {
    this.article.title = newTitle;
  }

  async publishArticle(webSiteId: string): Promise<void> {
    const res$ = this.articles.publishToWebSite(this.article.id!, webSiteId);
    await lastValueFrom(res$);
    await this.loadArticle();
  }

  async unpublishArticle(webSiteId: string): Promise<void> {
    const res$ = this.articles.unpublishFromWebSite(this.article.id!, webSiteId);
    await lastValueFrom(res$);
    await this.loadArticle();
  }

  hasSite(article: ArticleBlock, site: WebSiteModel): boolean {
    return article.webSites?.some(s => s.id === site.id) ?? false;
  }

  async saveArticle(): Promise<void> {
    if (!this.article.id) {
      console.warn(`Attempting to save article when id doesn't exist`);
      return;
    }

    const res$ = this.articles.updateArticle(this.article);
    await lastValueFrom(res$);
  }
}
