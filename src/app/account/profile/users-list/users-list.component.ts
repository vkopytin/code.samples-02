import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../../services/account.service';
import { UserModel } from '../../../services/models/userModel';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  allUsers?: UserModel[] = this.account.lastUsers;

  constructor(private account: AccountService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  async ngOnInit(): Promise<void> {
      const req$ = this.account.listUsers(0, 100);

      this.allUsers = await lastValueFrom(req$);
  }

  selectUser(user: UserModel): void {
    this.router.navigate(['details', user.userName], { relativeTo: this.activatedRoute });
  }
}
