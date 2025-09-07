import { Component, Input, OnInit } from '@angular/core';
import { ArticleBlocksService } from '../../services/articleBlocks.service';
import { lastValueFrom } from 'rxjs';
import { ArticleBlock } from '../../services/models/articleBlock';
import { debounce } from '../../utils';

@Component({
  selector: '[media-library]',
  templateUrl: './media-library.component.html',
  styleUrl: './media-library.component.scss'
})
export class MediaLibraryComponent implements OnInit {
  @Input('media-library') folder? = '';
  lastArticleBlocks = this.articleBlocks.lastArticleBlocks;
  contentChange = debounce(this.contentChangeInternal, 500);

  constructor(public articleBlocks: ArticleBlocksService) {

  }

  ngOnInit(): void {
    this.listArticleBlocks();
  }

  async listArticleBlocks(): Promise<void> {
    const res$ = this.articleBlocks.listArticleBlocks();
    this.lastArticleBlocks = await lastValueFrom(res$);
  }

  async contentChangeInternal(block: ArticleBlock): Promise<void> {
    const res$ = this.articleBlocks.updateArticleBlock(block);
    await lastValueFrom(res$);
  }
}
