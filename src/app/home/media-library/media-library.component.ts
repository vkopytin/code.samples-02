import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom, map, tap } from 'rxjs';
import { ArticleBlocksService } from '../../services/articleBlocks.service';

@Component({
  selector: '[media-library]',
  templateUrl: './media-library.component.html',
  styleUrl: './media-library.component.scss'
})
export class MediaLibraryComponent implements OnInit {
  @Input('media-library') folder? = '';
  lastArticleBlocks = this.articleBlocks.lastArticleBlocks;
  limit = 10;

  constructor(public articleBlocks: ArticleBlocksService) { }

  ngOnInit(): void {
    this.listArticleBlocks();
  }

  async listArticleBlocks(): Promise<void> {
    const res$ = this.articleBlocks.listArticleBlocks();
    this.lastArticleBlocks = await lastValueFrom(res$);
  }

  async loadMore(): Promise<void> {
    if (!this.articleBlocks.hasMore) {
      return;
    }

    const res$ = this.articleBlocks.listArticleBlocks(
      this.lastArticleBlocks.length,
      this.limit
    );
    const articles = await lastValueFrom(res$);
    this.lastArticleBlocks = [...this.lastArticleBlocks, ...articles];
  }
}
