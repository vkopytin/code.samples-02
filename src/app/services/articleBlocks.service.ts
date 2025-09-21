import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ArticleBlock } from './models/articleBlock';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleBlocksService {
  domain = environment.catalog.domain;
  lastArticleBlocks: ArticleBlock[] = [];
  hasMore = true;

  constructor(private http: HttpClient) { }

  listArticleBlocks(from = 0, limit = 10): Observable<ArticleBlock[]> {
    return this.http.get<any[]>(`${this.domain}/articleblocks/list`, {
      params: {
        from,
        limit: limit + 1
      }
    })
      .pipe(
        map(res => {
          this.hasMore = res.length > limit;
          return [].slice.call(res, 0, limit);
        }),
        tap(res => {
          this.lastArticleBlocks = res;
        })
      );
  }

  getById(blockId: string) {
    return this.http.get<ArticleBlock>(`${this.domain}/articleblocks/${blockId}`);
  }

  updateArticleBlock(block: ArticleBlock): Observable<ArticleBlock> {
    return this.http.put<ArticleBlock>(`${this.domain}/articleblocks/${block.id}`, block);
  }
}
