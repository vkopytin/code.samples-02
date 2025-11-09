import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ArticleDraft } from './models/articleDraft';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  domain: string = environment.catalog.domain;
  lastArticles: ArticleDraft[] = [];
  hasMore = true;

  constructor(private http: HttpClient) { }

  listArticles(from=0, limit=10): Observable<ArticleDraft[]> {
    return this.http.get<ArticleDraft[]>(`${this.domain}/articles/list`, {
      params: {
        from,
        limit: limit + 1
      }
    }).pipe(
      map(res => {
        this.hasMore = res.length > limit;
        return [].slice.call(res, 0, limit);
      }),
      tap(res => this.lastArticles = res)
    );
  }

  getById(articleId: string): Observable<ArticleDraft> {
    return this.http.get<ArticleDraft>(`${this.domain}/articles/${articleId}`);
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

  publishToWebSite(articleId: string, webSiteId: string): Observable<void> {
    return this.http.post<void>(`${this.domain}/articles/${articleId}/publish/${webSiteId}`, {});
  }
}
