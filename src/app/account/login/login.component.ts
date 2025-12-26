import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

import { AsyncPipe } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-login',
    imports: [AsyncPipe, RouterOutlet, RouterModule, FormsModule, ReactiveFormsModule],
    providers: [AuthService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  googleLoginUrl = '';

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const { prevUrl } = this.route.snapshot.queryParams;
    const username = this.loginForm.get('username')!.value;

    this.oauthService.initLoginFlow(prevUrl, {
      username
    });

    if (prevUrl) {
      this.router.navigateByUrl(prevUrl);
    } else {
      this.closeForm();
    }
  }

  onCancel(): void {
    this.closeForm();
  }

  async loadGoogleLoginUrl() {
    let {
      prevUrl = `${window.location}`
    } = this.route.snapshot.queryParams;
    prevUrl = prevUrl?.replace(/\([^\)]*\)$/, ''); // remove angular outlet info
    const res$ = this.authService.googleLogin(`${prevUrl}`);
    const res = await lastValueFrom(res$);

    this.googleLoginUrl = res.url;
  }

  async onGoogleLogin(evnt: Event): Promise<void> {
    evnt && evnt.preventDefault();
    await this.loadGoogleLoginUrl();
    window.location.href = this.googleLoginUrl;
  }

  private closeForm(): void {
    this.router.navigate([{ outlets: { account: null }}]);
  }
}
