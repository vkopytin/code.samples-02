import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { AuthClientDetailsComponent } from './auth-client-details/auth-client-details.component';
import { AuthClientListComponent } from './auth-client-list/auth-client-list.component';

@Component({
  selector: 'app-auth-client',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AuthClientListComponent, AuthClientDetailsComponent],
  templateUrl: './auth-client.component.html',
  styleUrl: './auth-client.component.scss'
})
export class AuthClientComponent {
  appToken = '';

  constructor() {
  }

}
