import { Component, Input } from '@angular/core';

@Component({
  selector: '[media-library]',
  templateUrl: './media-library.component.html',
  styleUrl: './media-library.component.scss'
})
export class MediaLibraryComponent {
  @Input('media-library') folder? = '';
}
