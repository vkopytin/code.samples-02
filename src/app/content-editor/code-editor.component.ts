import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  host: {
    tabindex: '0'
  },
  selector: '[code-editor]',
  template: '',
})
export class CodeEditorComponent {
  private text: string = '';

  @HostBinding('attr.contenteditable') contenteditable: string | boolean = "false";

  @Input('code-editor') get child(): string {
    return this.text;
  }
  set child(value: string) {
    if (this.text !== value) {
      this.text = value;
      this.elRef.nativeElement.innerText = value;
    }
  }

  @Output('code-editorChange') textChange = new EventEmitter<string>();

  @HostListener('focusin', ['$event']) onFocusIn(evnt: Event) {
    this.contenteditable = 'true';
  }
  @HostListener('focusout', ['$event']) onFocusOut(evnt: Event) {
    this.contenteditable = 'false';
  }
  @HostListener('input', ['$event']) onChange(evnt: Event) {
    this.text = this.elRef.nativeElement.innerText;
    this.textChange.emit(this.text);
  }

  constructor(private elRef: ElementRef) {

  }
}
