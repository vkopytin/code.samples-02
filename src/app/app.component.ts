import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

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

  constructor(private router: Router, private oauthService: OAuthService) {
    this.initLogin();
  }

  private async initLogin(): Promise<void> {
    this.oauthService.configure(authConfig);
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
    this.isLoading = false;
  }

  openLogin() {
    this.router.navigate([{ outlets: { account: 'login' } }]);
  }
}
