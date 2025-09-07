import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediaLibraryComponent } from './media-library.component';
import { ContentEditorModule } from '../../content-editor/content-editor.module';

@NgModule({
  imports: [CommonModule, ContentEditorModule],
  declarations: [MediaLibraryComponent],
  exports: [MediaLibraryComponent],
})
export class MediaLibraryModule {
}
