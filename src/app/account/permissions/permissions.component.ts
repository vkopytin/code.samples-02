import { Component, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { PermissionFlags } from '../../entities/permissionFlags';
import { AccountService } from '../../services/account.service';
import { PermissionModel } from '../../services/models/permissionModel';

@Component({
    selector: 'app-permissions',
    imports: [],
    templateUrl: './permissions.component.html',
    styleUrl: './permissions.component.scss'
})
export class PermissionsComponent implements OnInit {
  PermissionFlags = PermissionFlags;
  permissions = this.account.lastPermissions;

  constructor(
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.listPermissions();
  }

  async listPermissions(): Promise<void> {
    const res$ = this.account.listPermissions(0, 100);

    const roles = await lastValueFrom(res$);
    this.permissions = roles;
  }

  calculatePermissions(value: number, flag: PermissionFlags): boolean {
    return (value & flag) === flag;
  }
}
