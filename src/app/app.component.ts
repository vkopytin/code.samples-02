import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { delay, lastValueFrom } from 'rxjs';

import { environment } from '../environments/environment';
import { AccountService } from './services/account.service';
import { LoadingService } from './services/loading.service';
import { WebSiteModel } from './services/models/webSiteModel';
import { WebSitesService } from './services/webSites.service';

const authConfig: AuthConfig = {

  // Url des Authorization-Servers
  issuer: environment.issuer,

  // Url der Angular-Anwendung
  // An diese URL sendet der Authorization-Server den Access Code
  redirectUri: window.location.origin + '/index.html',

  // Name der Angular-Anwendung
  clientId: environment.clientId,

  // Rechte des Benutzers, die die Angular-Anwendung wahrnehmen möchte
  scope: 'read:files read:user-info openid profile email offline_access api https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',

  // Code Flow (PKCE ist standardmäßig bei Nutzung von Code Flow aktiviert)
  responseType: 'code'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgTemplateOutlet, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  allWebSites: WebSiteModel[] = this.webSites.lastWebsites;
  title = 'web-client';
  open = false;
  isLoading = true;
  requestLoading = false;

  private messaging: any;

  constructor(
    public readonly webSites: WebSitesService,
    public readonly loading: LoadingService,
    public router: Router,
    private account: AccountService,
    private oauthService: OAuthService,
    private app: FirebaseApp
  ) {
    this.initLogin();
  }

  ngOnInit(): void {
    this.listWebSites();
    this.messaging = getMessaging(this.app);
    this.requestPermission();
    this.account.healthCheck();

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

  private async initLogin(): Promise<void> {
    this.oauthService.setStorage(localStorage);
    this.oauthService.configure(authConfig);
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
    this.isLoading = false;
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

  selectWebSite(site: {}) {
    console.log(site);
  }
}
