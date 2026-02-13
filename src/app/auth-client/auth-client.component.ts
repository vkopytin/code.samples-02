import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth-client',
    imports: [RouterOutlet, RouterModule],
    templateUrl: './auth-client.component.html',
    styleUrl: './auth-client.component.scss'
})
export class AuthClientComponent {
  appToken = '';

  constructor() {
  }

}
