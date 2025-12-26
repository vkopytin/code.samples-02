import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Component({
    host: {
        tabindex: '0'
    },
    selector: '[editor]',
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.scss',
    standalone: false
})
export class EditorComponent {
  private element: HTMLElement = document.createElement('div');

  @HostBinding('attr.contenteditable') contenteditable: string | boolean = "false";

  @Input('editor') get child(): HTMLElement {
    return this.element;
  }
  set child(value: HTMLElement) {
    if (this.element !== value) {
      this.element = value;
    }
  }

  constructor() {

  }

  toArray(children: NodeListOf<ChildNode> | HTMLCollection): HTMLElement[] {
    return [].slice.call(children);
  }

  cmp(s1: string, s2: string): boolean {
    s1 = (s1 + '').toLowerCase();
    s2 = (s2 + '').toLowerCase();
    return s1 === s2;
  }
}
