import { Component, Input } from '@angular/core';

@Component({
  selector: '[article-media]',
  standalone: true,
  imports: [],
  templateUrl: './article-media.component.html',
  styleUrl: './article-media.component.scss'
})
export class ArticleMediaComponent {
  @Input('article-media') media?: any;
}
