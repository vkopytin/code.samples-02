import { Component, EventEmitter, Input, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ContentEditorModule } from '../../content-editor/content-editor.module';
import { ArticleBlocksService } from '../../services/articleBlocks.service';
import { MediaService } from '../../services/media.service';
import { ArticleBlock } from '../../services/models/articleBlock';

@Component({
    selector: '[article-media]',
    imports: [ContentEditorModule],
    templateUrl: './article-media.component.html',
    styleUrl: './article-media.component.scss'
})
export class ArticleMediaComponent {
  _media = {} as ArticleBlock;
  @Input('article-media') get media(): ArticleBlock {
    return this._media;
  }
  set media(value: ArticleBlock | undefined) {
    this._media = value || {} as ArticleBlock;
  }

  @Output('article-mediaChange') mediaChangeEvent = new EventEmitter<any>();

  constructor(
    public articleBlocks: ArticleBlocksService,
    public mediaSrv: MediaService,
  ) {

  }

  mediaChange(): void {
    this.mediaChangeEvent.emit(this.media);
  }

  async deleteMedia() {
    this.media.sourceUrl = '';
    this.media.origin = '';
    this.media.description = '';
    this.mediaChangeEvent.emit(this.media);
  }

  async uploadMedia(evnt: Event) {
    evnt && evnt.preventDefault();

    if (!this.media.id) {
      const res$ = this.articleBlocks.createArticleBlock({
        title: this.media.title,
        description: this.media.description,
      });
      this.media = await lastValueFrom(res$);
    }

    if (!this.media?.id) {
      console.warn(`Attemting to upload media when block id doesn't exist`);
      return;
    }

    const eventTarget = evnt.target as HTMLInputElement;
    const res$ = this.mediaSrv.upload(this.media.id, eventTarget);

    try {
      const res = await lastValueFrom(res$);

      this.media = res;
      this.mediaChangeEvent.emit(res);
    } catch (ex) {

      console.error(ex);
    }

    eventTarget.value = '';
    this.waitNormalization(10);
  }

  async waitNormalization(count: number) {
    if (count <= 0 || !this.media.id) {
      return;
    }
    const res$ = this.articleBlocks.getById(this.media.id);
    const item = await lastValueFrom(res$);
    if (item.sourceUrl != this.media.sourceUrl) {
      this.media = item;
      this.mediaChangeEvent.emit(item);
      return;
    }

    setTimeout(() => this.waitNormalization(count - 1), 2000);
  }
}
