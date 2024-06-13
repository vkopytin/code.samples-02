import { Component } from '@angular/core';

import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  constructor(private account: AccountService) {

  }
}
