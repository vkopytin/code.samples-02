import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { ContentEditorModule } from '../content-editor/content-editor.module';
import { ArticlesService } from '../services/articles.service';
import { ArticleBlock } from '../services/models/articleBlock';
import { ArticleDraft } from '../services/models/articleDraft';
import { debounce } from '../utils';
import { MediaLibraryModule } from './media-library/media-library.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule, ContentEditorModule,
    MediaLibraryModule, FormsModule, ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  articleForm!: FormGroup;
  articleTitle!: FormControl<string | null>;
  articleDescription!: FormControl<string | null>;
  allArticles: ArticleDraft[] = this.articles.lastArticles;
  contentChange = debounce(this.contentChangeInternal, 500);

  constructor(public articles: ArticlesService) {
    this.articleForm = new FormGroup({
      articleTitle: this.articleTitle = new FormControl('', Validators.required),
      articleDescription: this.articleDescription = new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.listArticles();
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
    const res$ = this.articles.listArticles();
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

    const res$ = this.articles.listArticles(this.allArticles?.length || 0, 10);
    const articles = await lastValueFrom(res$);
    this.allArticles = [...this.allArticles, ...articles];
  }

  async editArticle(article: ArticleBlock): Promise<void> {
  }

  private async contentChangeInternal(article: ArticleDraft): Promise<void> {
    const res$ = this.articles.updateArticle(article);
    const updatedArticle = await lastValueFrom(res$);
    article.media = updatedArticle.media;
  }
}
