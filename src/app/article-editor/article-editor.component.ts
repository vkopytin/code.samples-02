import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { ContentEditorModule } from '../content-editor/content-editor.module';
import { ArticlesService } from '../services/articles.service';
import { ArticleDraft } from '../services/models/articleDraft';
import { ArticleMediaComponent } from './article-media/article-media.component';

@Component({
  selector: '[article-editor]',
  standalone: true,
  imports: [ArticleMediaComponent, ContentEditorModule],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.scss'
})
export class ArticleEditorComponent implements OnInit{
  @Input('article-editor') article: ArticleDraft = {
    title: '',
    description: '',
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly articles: ArticlesService,
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

  onTitleChange(newTitle: string): void {
    this.article.title = newTitle;
  }
}
