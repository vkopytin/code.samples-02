import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { delay, lastValueFrom } from 'rxjs';

import { environment } from '../environments/environment';
import { AccountService } from './services/account.service';
import { LoadingService } from './services/loading.service';

import { WebSitesService } from './services/webSites.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgTemplateOutlet, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  allWebSites = this.webSites.lastWebsites;
  profile = this.webSites.profile;
  title = 'web-client';
  open = false;
  isLoading = true;
  requestLoading = false;

  private messaging: any;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly app: FirebaseApp,
    private readonly webSites: WebSitesService,
    private readonly loading: LoadingService,
    private readonly account: AccountService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.authService.initAuth();
    this.isLoading = false;
    this.messaging = getMessaging(this.app);
    this.requestPermission();
    this.account.healthCheck();

    this.profile = await lastValueFrom(this.webSites.getProfile());
    await this.listWebSites();

    this.loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.requestLoading = loading;
      });

    onMessage(this.messaging, (payload) => {
      console.log(JSON.stringify(payload));
      // ...
    });
  }

  async listWebSites(): Promise<void> {
    const res$ = this.webSites.listWebSites();
    this.allWebSites = await lastValueFrom(res$);
  }

  openLogin() {
    this.router.navigate([{ outlets: { account: 'login' } }]);
  }

  async requestPermission() {
    console.log('Requesting permission...');

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        const currentToken = await getToken(this.messaging, {
          vapidKey: environment.firebaseConfig.vapidKey,
        });
        if (currentToken) {
          console.log(currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  }

  async selectWebSite(evnt: Event): Promise<void> {
    const selectElement = evnt.target as HTMLSelectElement | null;
    const siteId = selectElement?.value;
    if (!siteId) {
      return;
    }

    var res$ = this.webSites.selectWebSite(siteId);
    await lastValueFrom(res$);
    this.router.navigateByUrl('/');
  }
}
