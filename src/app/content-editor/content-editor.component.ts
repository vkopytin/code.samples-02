import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: '[content-editor]',
  templateUrl: './content-editor.component.html',
  styleUrl: './content-editor.component.scss'
})
export class ContentEditorComponent {
  element = document.createElement('div');
  originValue = '';
  isEditable = false;

  @Input('content-editor') get html(): string {
    return this.originValue;
  }
  set html(value: string) {
    const newElement = document.createElement('div');
    newElement.innerHTML = value;
    if (newElement.innerHTML === this.originValue) {
      return;
    }
    this.originValue = value;
    this.element = newElement;
  }

  @Output('content-editorChange') htmlChange = new EventEmitter();

  @HostListener('input', ['$event']) onChange(evnt: Event) {
    this.originValue = this.element.innerHTML;
    this.htmlChange.emit(this.element.innerHTML);
  }

  toArray(children: NodeListOf<ChildNode> | HTMLCollection): ChildNode[] {
    return [].slice.call(children);
  }

  cmp(s1: string, s2: string): boolean {
    s1 = (s1 + '').toLowerCase();
    s2 = (s2 + '').toLowerCase();
    return s1 === s2;
  }
}
