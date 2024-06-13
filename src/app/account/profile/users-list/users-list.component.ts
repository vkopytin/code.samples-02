import { Component } from '@angular/core';

import { AccountService } from '../../../services/account.service';
import { UserModel } from '../../../services/models/userModel';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  allUsers?: UserModel[];
  selectedItem?: UserModel;

  constructor(private account: AccountService) {

  }

  selectUser(userId: string): void {

  }
}
