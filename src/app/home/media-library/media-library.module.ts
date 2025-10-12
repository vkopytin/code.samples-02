import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediaLibraryComponent } from './media-library.component';
import { ContentEditorModule } from '../../content-editor/content-editor.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MediaItemComponent } from './media-item/media-item.component';

@NgModule({
  imports: [CommonModule, ContentEditorModule, DragDropModule],
  declarations: [MediaLibraryComponent, MediaItemComponent],
  exports: [MediaLibraryComponent, MediaItemComponent],
})
export class MediaLibraryModule {
}
