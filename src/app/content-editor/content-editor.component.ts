import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, Output, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CodeEditorComponent } from './code-editor.component';
import { HtmlEditorComponent } from './html-editor.component';

@Component({
    selector: '[content-editor]',
    templateUrl: './content-editor.component.html',
    styleUrl: './content-editor.component.scss',
    standalone: false
})
export class ContentEditorComponent {
  @ViewChild ("docEditor", {read: ElementRef}) docEditor?: ElementRef;
  @ViewChild(CodeEditorComponent) codeEditor?: CodeEditorComponent;
  @ViewChild(HtmlEditorComponent) htmlEditor?: HtmlEditorComponent;

  originValue = '';
  editHtml = false;
  private window: Window | null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

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

  async pasteFromClipboard(docEditor: ElementRef = this.docEditor!): Promise<void> {
    if (!docEditor) return;

    if (this.codeEditor) {
      this.codeEditor.contenteditable = 'true';
    } else if (this.htmlEditor) {
      this.htmlEditor.contenteditable = 'true';
    }

    docEditor.nativeElement.focus();

    if (this.window?.navigator?.clipboard) {
      try {
        const text = await this.window.navigator.clipboard.readText();
        document.execCommand('insertText', false, text);
        return;
      } catch {}
    }

    docEditor.nativeElement.focus();
    this.document.execCommand('paste');
  }

  async copyToClipboard(docEditor: ElementRef = this.docEditor!): Promise<void> {
    if (!docEditor) return;
    const plainText = docEditor.nativeElement?.innerText || this.originValue || '';

    if (this.window?.navigator?.clipboard) {
      try {
        await this.window.navigator.clipboard.writeText(plainText);
        return;
      } catch {}
    }

    const range = this.document.createRange();
    range.selectNodeContents(docEditor.nativeElement);
    const selection = this.window?.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    try {
      this.document.execCommand('copy');
    } finally {
      if (selection) selection.removeAllRanges();
    }
  }
}
