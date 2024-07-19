import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: '[content-editor]',
  templateUrl: './content-editor.component.html',
  styleUrl: './content-editor.component.scss'
})
export class ContentEditorComponent {
  originValue = '';
  editHtml = false;

  @Input('content-editor') get html(): string {
    return this.originValue;
  }
  set html(value: string) {
    if (value === this.originValue) {
      return;
    }
    this.originValue = value;
  }

  @Output('content-editorChange') htmlChange = new EventEmitter();

  @HostListener('input', ['$event']) onChange(evnt: Event) {
    this.htmlChange.emit(this.originValue);
  }

}
