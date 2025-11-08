import { Component, EventEmitter, Input, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ArticleBlocksService } from '../../../services/articleBlocks.service';
import { MediaService } from '../../../services/media.service';
import { ArticleBlock } from '../../../services/models/articleBlock';
import { debounce } from '../../../utils';

@Component({
  selector: '[media-item]',
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.component.scss'
})
export class MediaItemComponent {
  @Input('media-item') item = {} as ArticleBlock;
  @Output('media-itemChange') itemChange = new EventEmitter<ArticleBlock>();

  contentChange = debounce(this.contentChangeInternal, 500);

  constructor(
    public articleBlocks: ArticleBlocksService,
    public mediaSrv: MediaService,
  ) {

  }

  async contentChangeInternal(block: ArticleBlock): Promise<void> {
    if (!block.id) {
      console.warn(`Attemting to update block when id doesn't exist`);
      return;
    }

    const res$ = this.articleBlocks.updateArticleBlock(block);
    await lastValueFrom(res$);
  }

  async uploadMedia(evnt: Event) {
    evnt && evnt.preventDefault();
    if (!this.item.id) {
      const res$ = this.articleBlocks.createArticleBlock({
        title: this.item.title,
        description: this.item.description,
      });
      this.item = await lastValueFrom(res$);
    }

    if (!this.item.id) {
      console.warn(`Attemting to upload media when block id doesn't exist`);
      return;
    }

    const eventTarget = evnt.target as HTMLInputElement;
    const res$ = this.mediaSrv.upload(this.item.id, eventTarget);

    try {
      const res = await lastValueFrom(res$);

      this.item = res;
      this.itemChange.emit(res);
    } catch (ex) {

      console.error(ex);
    }

    eventTarget.value = '';
    this.waitNormalization(10);
  }

  async waitNormalization(count: number) {
    if (count <= 0 || !this.item.id) {
      return;
    }
    const res$ = this.articleBlocks.getById(this.item.id);
    const item = await lastValueFrom(res$);
    if (item.sourceUrl != this.item.sourceUrl) {
      this.item = item;
      this.itemChange.emit(item);
      return;
    }

    setTimeout(() => this.waitNormalization(count - 1), 1000);
  }
}
