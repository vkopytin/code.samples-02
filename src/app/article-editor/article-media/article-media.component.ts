import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentEditorModule } from '../../content-editor/content-editor.module';

@Component({
  selector: '[article-media]',
  standalone: true,
  imports: [ContentEditorModule],
  templateUrl: './article-media.component.html',
  styleUrl: './article-media.component.scss'
})
export class ArticleMediaComponent {
  @Input('article-media') media?: any;

  @Output('article-mediaChange') mediaChangeEvent = new EventEmitter<any>();

  mediaChange(): void {
    this.mediaChangeEvent.emit(this.media);
  }
}
