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
  standalone: true,
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly articles: ArticlesService,
    public readonly webSites: WebSitesService,
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('articleId');

    if (!articleId) {
      console.error('No articleId provided to ArticleEditorComponent');
      return;
    }

    this.loadArticle(articleId);
  }

  async loadArticle(articleId: string): Promise<void> {
    const res$ = this.articles.getById(articleId);
    const article = await lastValueFrom(res$);
    this.article = article;
  }

  togglePrintMediaView(): void {
    const src = this._article.media?.sourceUrl;
    var win = window.open('about:blank', "_new");
    if (!win) {
      window.open(src, "_blank");
      return;
    }
    win.document.open();
    win.document.write([
        '<html>',
        '   <head>',
        '   </head>',
        '   <body onload="window.print()" onafterprint="window.close()">',
        '       <img src="' + src + '"/>',
        '   </body>',
        '</html>'
    ].join(''));
    win.document.close();
  }

  onTitleChange(newTitle: string): void {
    this.article.title = newTitle;
  }

  publishArticle(webSiteId: string): void {
    console.log('Publishing article:', this.article);
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
