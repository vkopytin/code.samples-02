import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AccountService } from '../../services/account.service';

interface UserRoleAndPermissions {
  userId: string;
  user: {};
  roleName: string;
  permissions: number;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {
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

  showPermissions(role: UserRoleAndPermissions): string {
    return '';
  }

  onSubmit(): void {
    console.log(this.roleForm.value);
  }
}
