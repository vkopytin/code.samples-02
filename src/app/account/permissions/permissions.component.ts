import { Component, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { RoleModel } from '../../services/models/roleModel';

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
  roles = this.account.lastRoles;

  constructor(
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.listRoles();
  }

  async listRoles(): Promise<void> {
    const res$ = this.account.listRoles(0, 100);

    const roles = await lastValueFrom(res$);
    this.roles = roles;
  }

  calculatePermissions(value: number, flag: PermissionFlags): boolean {
    return (value & flag) === flag;
  }

  updatePermission(role: RoleModel, flag: PermissionFlags, event: Event): void {
    const {checked: isChecked} = event.target as HTMLInputElement;
    if (isChecked) {
      role.permissions |= flag;
    } else {
      role.permissions &= ~flag;
    }
  }

  updateRole(role: RoleModel): void {
    console.log('Saving permissions', role);
  }
}
