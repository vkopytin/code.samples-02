import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: '[content-view]',
    template: '',
    standalone: false
})
export class ContentViewComponent {
  @Input('content-view') get child(): string {
    return this.elRef.nativeElement.innerHTML;
  }
  set child(value: string) {
      this.elRef.nativeElement.innerHTML = value;
  }

  constructor(private elRef: ElementRef) {

  }
}
