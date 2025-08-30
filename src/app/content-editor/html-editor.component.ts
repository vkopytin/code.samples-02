import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  host: {
    tabindex: '0'
  },
  selector: '[html-editor]',
  template: '',
})
export class HtmlEditorComponent {
  private text: string = '';

  @HostBinding('attr.contenteditable') contenteditable: string | boolean = "false";

  @Input('html-editor') get child(): string {
    return this.text;
  }
  set child(value: string) {
    if (this.text !== value) {
      this.text = value;
      this.elRef.nativeElement.innerHTML = value;
    } else if (value === '') {
      this.text = '<p><br/></p>';
      this.elRef.nativeElement.innerHTML = this.text;
    }
  }

  @Output('html-editorChange') textChange = new EventEmitter<string>();

  @HostListener('focusin', ['$event']) onFocusIn(evnt: Event) {
    this.contenteditable = 'true';
  }
  @HostListener('focusout', ['$event']) onFocusOut(evnt: Event) {
    this.contenteditable = 'false';
  }
  @HostListener('input', ['$event']) onChange(evnt: Event) {
    this.text = this.elRef.nativeElement.innerHTML;
    this.textChange.emit(this.text);
  }

  constructor(private elRef: ElementRef) {

  }
}
