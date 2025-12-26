
import { Component } from '@angular/core';

@Component({
    imports: [],
    selector: 'app-accept-share',
    template: `
    <div class="p-4">
      <h2>Shared Content Received</h2>
      @if (title) {
        <div><strong>Title:</strong> {{ title }}</div>
      }
      @if (text) {
        <div><strong>Text:</strong> {{ text }}</div>
      }
      @if (url) {
        <div><strong>URL:</strong> <a [href]="url" target="_blank">{{ url }}</a></div>
      }
      @if (files && files.length) {
        <div>
          <strong>Files:</strong>
          <ul>
            @for (file of files; track file) {
              <li>{{ file.name }} ({{ file.type }})</li>
            }
          </ul>
        </div>
      }
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
