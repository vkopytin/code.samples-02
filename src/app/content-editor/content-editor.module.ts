import { NgModule } from "@angular/core";
import { ContentEditorComponent } from "./content-editor.component";
import { CommonModule } from "@angular/common";
import { EditorComponent } from "./editor/editor.component";
import { CodeEditorComponent } from "./code-editor.component";
import { HtmlEditorComponent } from "./html-editor.component";
import { ContentViewComponent } from "./content-view.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ContentEditorComponent, HtmlEditorComponent, EditorComponent, CodeEditorComponent, ContentViewComponent],
  exports: [ContentEditorComponent, EditorComponent, CodeEditorComponent, ContentViewComponent],
})
export class ContentEditorModule {

}
