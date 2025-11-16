import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Enable :active styles on mobile devices
document.addEventListener('touchstart', () => {}, true);

// Close dropdowns when clicking outside
window.addEventListener('click', e => {
  document.querySelectorAll('.dropdown').forEach((dropdown: Element & { open?: boolean }) => {
    if (!('target' in e) || !e.target) {
      return;
    }
    if (!dropdown.contains(e.target as Node)) {
      // Click was outside the dropdown, close it
      dropdown.open = false;
    }
  });
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
