import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ArticleBlocksService } from '../../services/articleBlocks.service';

@Component({
  selector: '[media-library]',
  templateUrl: './media-library.component.html',
  styleUrl: './media-library.component.scss'
})
export class MediaLibraryComponent implements OnInit {
  @Input('media-library') folder? = '';
  lastArticleBlocks = this.articleBlocks.lastArticleBlocks;

  constructor(public articleBlocks: ArticleBlocksService) { }

  ngOnInit(): void {
    this.listArticleBlocks();
  }

  async listArticleBlocks(): Promise<void> {
    const res$ = this.articleBlocks.listArticleBlocks();
    this.lastArticleBlocks = await lastValueFrom(res$);
  }

}
