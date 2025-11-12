import { Component } from '@angular/core';

enum PermissionFlags {
  None = 0,
  List = 1 << 0,
  Details = 1 << 1,
  Create = 1 << 2,
  Edit = 1 << 3,
  Remove = 1 << 4,
}

interface RoleModel {
  name: string;
  permissions: number;
}

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent {
  PermissionFlags = PermissionFlags;
  roles = [{
    name: 'list_users',
    permissions: PermissionFlags.List | PermissionFlags.Details,
  }, {
    name: 'edit_users',
    permissions: PermissionFlags.Details | PermissionFlags.Edit,
  }]

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
