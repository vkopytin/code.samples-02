import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  host: {
    tabindex: '0'
  },
  selector: '[editor]',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
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
    if (this.elRef.nativeElement.innerHTML !== value.innerHTML) {
      this.elRef.nativeElement.innerHTML = value.innerHTML;
    }
  }

  @HostListener('focusin', ['$event']) onFocusIn(evnt: Event) {
    this.contenteditable = 'true';
  }
  @HostListener('focusout', ['$event']) onFocusOut(evnt: Event) {
    this.contenteditable = 'false';
  }
  @HostListener('input', ['$event']) onChange(evnt: Event) {
    this.element.innerHTML = this.elRef.nativeElement.innerHTML;
  }

  constructor(private elRef: ElementRef) {

  }
}
