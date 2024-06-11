import { Component, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RouterModule, RouterOutlet } from '@angular/router';

import { AccountService } from '../services/account.service';
import { AuthClientListComponent } from './auth-client-list/auth-client-list.component';
import { AuthClientDetailsComponent } from './auth-client-details/auth-client-details.component';
import { ClientModel } from '../services/models/clientToSave';

@Component({
  selector: 'app-auth-client',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AuthClientListComponent, AuthClientDetailsComponent],
  templateUrl: './auth-client.component.html',
  styleUrl: './auth-client.component.scss'
})
export class AuthClientComponent {
  @Input()
  appToken = '';

  constructor(private account: AccountService) {
  }

}
