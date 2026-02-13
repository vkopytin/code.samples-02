import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { ContentEditorModule } from '../content-editor/content-editor.module';
import { ArticlesService } from '../services/articles.service';
import { ArticleBlock } from '../services/models/articleBlock';
import { ArticleDraft } from '../services/models/articleDraft';
import { debounce } from '../utils';
import { MediaLibraryModule } from './media-library/media-library.module';
import { WebSitesService } from '../services/webSites.service';

@Component({
    selector: 'app-home',
    imports: [
        RouterModule, ContentEditorModule,
        MediaLibraryModule, FormsModule, ReactiveFormsModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  currentSiteId = this.webSites.getCurrentSiteId();
  articleForm!: FormGroup;
  articleTitle!: FormControl<string | null>;
  articleDescription!: FormControl<string | null>;
  allArticles: ArticleDraft[] = this.articles.lastArticles;
  contentChange = debounce(this.contentChangeInternal, 500);

  constructor(
    private activatedRoute: ActivatedRoute,
    public webSites: WebSitesService,
    public articles: ArticlesService,
  ) {
    this.articleForm = new FormGroup({
      articleTitle: this.articleTitle = new FormControl('', Validators.required),
      articleDescription: this.articleDescription = new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const currentSiteId = params['currentSiteId'];
      if (currentSiteId !== this.currentSiteId) {
        this.currentSiteId = currentSiteId;
      }
      this.listArticles();
    });
  }

  getArticleMedia(article: ArticleDraft): ArticleBlock {
    return article.media = article?.media || {
      description: '',
      title: ''
    };
  }

  updateMedia(article: ArticleDraft, media: ArticleBlock): void {
    if (!media) {
      return;
    }

    article.media = media;
    this.contentChange(article);
  }

  async listArticles(): Promise<void> {
    const webSiteId = this.webSites.getCurrentSiteId();
    const res$ = this.articles.listArticles(webSiteId);
    this.allArticles = await lastValueFrom(res$);
  }

  async createArticle(): Promise<void> {
    const res$ = this.articles.createArticle({
      title: this.articleTitle.value || '',
      description: this.articleDescription.value || '',
    });
    await lastValueFrom(res$);

    this.articleForm.reset();
    this.listArticles();
  }

  async loadMore(): Promise<void> {
    if (!this.articles.hasMore) {
      return;
    }

    const webSiteId = this.webSites.getCurrentSiteId();
    const res$ = this.articles.listArticles(webSiteId, this.allArticles?.length || 0, 10);
    const articles = await lastValueFrom(res$);
    this.allArticles = [...this.allArticles, ...articles];
  }

  private async contentChangeInternal(article: ArticleDraft): Promise<void> {
    const res$ = this.articles.updateArticle(article);
    const updatedArticle = await lastValueFrom(res$);
    article.media = updatedArticle.media;
  }
}
