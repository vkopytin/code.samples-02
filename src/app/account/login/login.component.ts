import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private oauthService: OAuthService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
    });
  }

  async onSubmit(): Promise<void> {
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

  private closeForm(): void {
    this.router.navigate([{ outlets: { account: null }}]);
  }
}
