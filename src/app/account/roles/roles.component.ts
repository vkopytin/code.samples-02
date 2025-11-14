import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { PermissionFlags } from '../../entities/permissionFlags';
import { AccountService } from '../../services/account.service';
import { UserRoleAndPermissions } from '../../services/models/userRoleAndPermissions';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {
  PermissionFlags = PermissionFlags;
  roles = this.account.lastRoles;
  workflows = this.account.lastWorkflows;
  roleForm!: FormGroup;

  constructor(
    private account: AccountService
  ) { }

  ngOnInit(): void {
    this.roleForm = new FormGroup({
      roleName: new FormControl<string>({ value: '', disabled: false }, [Validators.required]),
      workflowId: new FormControl<number | null>({value: 0, disabled: false}, [Validators.required]),
    });
    this.loadWorkflows();
    this.loadRoles();
  }

  async loadWorkflows(): Promise<void> {
    const res$ = this.account.listWorkflows();

    this.workflows = await lastValueFrom(res$);
  }

  async loadRoles(): Promise<void> {
    const res$ = this.account.listRoles();

    this.roles = await lastValueFrom(res$);
  }

  showResource(role: UserRoleAndPermissions): string {
    return role.resource;
  }

  async onSubmit(): Promise<void> {
    const res$ = this.account.createRole({
      roleName: this.roleForm.value.roleName,
      workflowId: +this.roleForm.value.workflowId,
    });

    await lastValueFrom(res$);
    this.roleForm.reset();
    this.roleForm.setValue({
      roleName: '',
      workflowId: 0,
    });
    this.loadRoles();
  }

  calculatePermissions(value: number, flag: PermissionFlags): boolean {
    return (value & flag) === flag;
  }

  updatePermission(role: UserRoleAndPermissions, flag: PermissionFlags, event: Event): void {
    const {checked: isChecked} = event.target as HTMLInputElement;
    if (isChecked) {
      role.permissions |= flag;
    } else {
      role.permissions &= ~flag;
    }
  }

  async saveRole(role: UserRoleAndPermissions): Promise<void> {
    const res$ = this.account.updateUserRole(role);

    const res = await lastValueFrom(res$);
    Object.assign(role, res);
  }
}
