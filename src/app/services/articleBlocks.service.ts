import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ArticleBlock } from './models/articleBlock';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleBlocksService {
  domain = environment.catalog.domain;
  lastArticleBlocks: ArticleBlock[] = [];

  constructor(private http: HttpClient) { }

  listArticleBlocks(): Observable<ArticleBlock[]> {
    return this.http.get<any[]>(`${this.domain}/articleblocks/list`)
      .pipe(
        tap(res => this.lastArticleBlocks = res)
      );
  }

  updateArticleBlock(block: ArticleBlock): Observable<ArticleBlock> {
    return this.http.put<ArticleBlock>(`${this.domain}/articleblocks/${block.id}`, block);
  }
}
