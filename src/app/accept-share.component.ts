import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    imports: [CommonModule],
    selector: 'app-accept-share',
    template: `
    <div class="p-4">
      <h2>Shared Content Received</h2>
      <div *ngIf="title"><strong>Title:</strong> {{ title }}</div>
      <div *ngIf="text"><strong>Text:</strong> {{ text }}</div>
      <div *ngIf="url"><strong>URL:</strong> <a [href]="url" target="_blank">{{ url }}</a></div>
      <div *ngIf="files && files.length">
        <strong>Files:</strong>
        <ul>
          <li *ngFor="let file of files">{{ file.name }} ({{ file.type }})</li>
        </ul>
      </div>
    </div>
  `
})
export class AcceptShareComponent {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];

  constructor() {
    if ('launchQueue' in window) {
      (window as any).launchQueue.setConsumer((launchParams: any) => {
        if (!launchParams.files) return;
        this.files = launchParams.files;
      });
    }
    if (navigator && 'share' in navigator) {
      // Optionally handle navigator.share events here
    }
    // Try to get shared data from POST (for share_target)
    if (window.location.pathname === '/accept-share' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(reg => {
        reg.active?.postMessage({ type: 'getSharedData' });
      });
      window.addEventListener('message', (event: MessageEvent) => {
        if (event.data && event.data.type === 'sharedData') {
          this.title = event.data.title;
          this.text = event.data.text;
          this.url = event.data.url;
          this.files = event.data.files;
        }
      });
    }
  }
}
