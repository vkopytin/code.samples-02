import { Component, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { PermissionModel } from '../../services/models/permissionModel';

enum PermissionFlags {
  None = 0,
  List = 1 << 0,
  Details = 1 << 1,
  Create = 1 << 2,
  Edit = 1 << 3,
  Remove = 1 << 4,
}

@Component({
  selector: 'app-permissions',
  standalone: true,
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

  updatePermission(role: PermissionModel, flag: PermissionFlags, event: Event): void {
    const {checked: isChecked} = event.target as HTMLInputElement;
    if (isChecked) {
      role.permissions |= flag;
    } else {
      role.permissions &= ~flag;
    }
  }

  savePermission(role: PermissionModel): void {
    console.log('Saving permissions', role);
  }
}
