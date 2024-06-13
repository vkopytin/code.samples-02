import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private oauthService: OAuthService, private router: Router) {}

  canActivate(state: RouterStateSnapshot): boolean {
    if (this.oauthService.hasValidAccessToken()) {

      return true;
    }
    this.router.navigate([{ outlets: { account: 'login' } }], { queryParams: { prevUrl: state.url }});

    return false;
  }
}
