import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { lastValueFrom, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    providers: [AuthService],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  public get hasConfirmPasswordError() {
    return this.registerForm.get('confirm-password')?.hasError('confirmPassword');
  }

  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      username: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
      'confirm-password': new FormControl<string>('', Validators.required),
      role: new FormControl<string>('Everyone', Validators.required),
    }, {
      validators: (control) => {
        if (control.value.password !== control.value['confirm-password']) {
          control.get("confirm-password")?.setErrors({ confirmPassword: true });
        }
        return null;
      },
    });

    // Clear error message when form values change
    this.registerForm.valueChanges.subscribe(() => {
      if (this.errorMessage) {
        this.errorMessage = '';
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.registerForm.valid) {
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;

    try {
      var req$ = this.auth.register({
        name: this.registerForm.get('name')!.value,
        username: this.registerForm.get('username')!.value,
        password: this.registerForm.get('password')!.value,
        role: this.registerForm.get('role')!.value,
      });

      await lastValueFrom(req$);
      this.router.navigate(['profile']);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
          let errorMsg = 'Registration failed. Please try again.';

          if (error.error && typeof error.error === 'string') {
            errorMsg = error.error;
          } else if (error.error && error.error.message) {
            errorMsg = error.error.message;
          } else if (error.message) {
            errorMsg = error.message;
          } else if (error.status === 409) {
            errorMsg = 'User with this email already exists.';
          } else if (error.status === 400) {
            errorMsg = 'Invalid registration data. Please check your inputs.';
          } else if (error.status >= 500) {
            errorMsg = 'Server error occurred. Please try again later.';
          }
          this.errorMessage = errorMsg;
        } else {
          this.errorMessage = `${error}`;
        }
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['home']);
  }
}
