import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ArticleDraft } from './models/articleDraft';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  domain: string = environment.catalog.domain;
  lastArticles?: ArticleDraft[];

  constructor(private http: HttpClient) { }

  listArticles(): Observable<ArticleDraft[]> {
    return this.http.get<ArticleDraft[]>(`${this.domain}/articles/list`).pipe(
      tap(res => this.lastArticles = res)
    );
  }

  createArticle(article: ArticleDraft): Observable<ArticleDraft> {
    return this.http.post<ArticleDraft>(`${this.domain}/articles/create`, {
      ...article,
      blocks: [],
    });
  }

  updateArticle(article: ArticleDraft): Observable<ArticleDraft> {
    return this.http.put<ArticleDraft>(`${this.domain}/articles/${article.id}`, article);
  }
}
