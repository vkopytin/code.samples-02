import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, lastValueFrom, map, of, tap } from 'rxjs';
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
    const res$ = this.articleBlocks.updateArticleBlock(block);
    await lastValueFrom(res$);
  }

  async uploadMedia(evnt: Event) {
    if (!this.item.id) {
      console.warn(`Attemting to upload media when block id doesn't exist`);
      return;
    }
    evnt && evnt.preventDefault();
    const eventTarget = evnt.target as HTMLInputElement;
    const res$ = this.mediaSrv.upload(this.item.id, eventTarget);

    try {
      const res = await lastValueFrom(res$);

      this.item.media = res;
      this.itemChange.emit(this.item);
    } catch (ex) {

      console.error(ex);
    }

    eventTarget.value = '';
  }
}
