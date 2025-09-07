import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediaLibraryComponent } from './media-library.component';


@NgModule({
  imports: [CommonModule],
  declarations: [MediaLibraryComponent],
  exports: [MediaLibraryComponent],
})
export class MediaLibraryModule {
}
