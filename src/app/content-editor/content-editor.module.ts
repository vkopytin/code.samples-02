import { NgModule } from "@angular/core";
import { ContentEditorComponent } from "./content-editor.component";
import { CommonModule } from "@angular/common";
import { EditorComponent } from "./editor/editor.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ContentEditorComponent, EditorComponent],
  exports: [ContentEditorComponent, EditorComponent],
})
export class ContentEditorModule {

}
