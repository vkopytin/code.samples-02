import { NgModule } from "@angular/core";
import { ContentEditorComponent } from "./content-editor.component";
import { CommonModule } from "@angular/common";
import { EditorComponent } from "./editor/editor.component";
import { CodeEditorComponent } from "./code-editor.component";
import { HtmlEditorComponent } from "./html-editor.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ContentEditorComponent, HtmlEditorComponent, EditorComponent, CodeEditorComponent],
  exports: [ContentEditorComponent, EditorComponent, CodeEditorComponent],
})
export class ContentEditorModule {

}
