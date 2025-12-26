import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
    host: {
        tabindex: '0'
    },
    selector: '[code-editor]',
    template: '',
    standalone: false
})
export class CodeEditorComponent {
  public viewId = 'code-editor-' + Math.random().toString(36).substring(2);
  private text: string = '';

  @HostBinding('attr.contenteditable') contenteditable: string | boolean = "false";

  @Input('code-editor') get child(): string {
    return this.text;
  }
  set child(value: string) {
    if (this.text !== value) {
      this.text = value;
      this.elRef.nativeElement.innerText = value;
    } else if (!value) {
      this.text = '';
      this.elRef.nativeElement.innerText = this.text;
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
