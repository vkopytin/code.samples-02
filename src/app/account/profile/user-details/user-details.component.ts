import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { AccountService } from '../../../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRoleAndPermissions } from '../../../services/models/userRoleAndPermissions';

@Component({
    selector: 'app-user-details',
    imports: [FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './user-details.component.html',
    styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  roles = this.account.lastRoles;
  userForm!: FormGroup;
  isEdit = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(private activatedRoute: ActivatedRoute, private account: AccountService) {

  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      userName: new FormControl<string>({ value: '', disabled: true }, [Validators.required, Validators.email]),
      name: new FormControl<string>('', Validators.required),
      role: new FormControl<string>('', Validators.required),
    });

    const email: string | undefined = this.activatedRoute.snapshot.params['userId'];
    if (email) {
      this.isEdit = true;
      const res$ = this.account.getUser(email);
      res$.subscribe(user => {
        this.userForm.patchValue({
          userName: user.userName,
          name: user.name,
          role: user.role,
        });
      });
    }

    this.loadRoles();
  }

  async loadRoles(): Promise<void> {
    const res$ = this.account.listRoles();

    this.roles = await lastValueFrom(res$);
  }

  hasRole(role: UserRoleAndPermissions): boolean {
    const roles = `${this.userForm.value.role || ''}`.split(/\s+/);

    return roles.includes(role.roleName);
  }

  onRoleChange(role: UserRoleAndPermissions, event: Event): void {
    const input = event.target as HTMLInputElement;
    let roles = `${this.userForm.value.role || ''}`.split(/\s+/);
    if (input.checked) {
      if (!roles.includes(role.roleName)) {
        roles.push(role.roleName);
      }
    } else {
      roles = roles.filter(r => r !== role.roleName);
    }
    this.userForm.patchValue({ role: roles.join(' ') });
  }

  async onSubmit(): Promise<void> {
    const user = this.userForm.getRawValue();
    const res$ = this.account.updateUser({
      userName: user.userName,
      name: user.name,
      role: user.role,
    });

    try {
      this.isSubmitting = true;
      const res = await lastValueFrom(res$);
      this.userForm.patchValue(res);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred while saving the user.';
        }
      } else {
        this.errorMessage = 'An unexpected error occurred.';
      }
    } finally {
      this.isSubmitting = false;
    }
  }
}
