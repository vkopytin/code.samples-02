import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { AccountService } from './services/account.service';

const authConfig: AuthConfig = {

  // Url des Authorization-Servers
  issuer: environment.issuer,

  // Url der Angular-Anwendung
  // An diese URL sendet der Authorization-Server den Access Code
  redirectUri: window.location.origin + '/index.html',

  // Name der Angular-Anwendung
  clientId: environment.clientId,

  // Rechte des Benutzers, die die Angular-Anwendung wahrnehmen möchte
  scope: 'read:files read:user-info openid profile email offline_access api',

  // Code Flow (PKCE ist standardmäßig bei Nutzung von Code Flow aktiviert)
  responseType: 'code'
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web-client';
  open = false;
  isLoading = true;

  constructor(
    public router: Router,
    private account: AccountService,
    private oauthService: OAuthService
  ) {
    this.initLogin();
    oauthService.setStorage(localStorage);
  }

  private async initLogin(): Promise<void> {
    this.oauthService.configure(authConfig);
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
    await this.account.healthCheck();
    this.isLoading = false;
  }

  openLogin() {
    this.router.navigate([{ outlets: { account: 'login' } }]);
  }
}
