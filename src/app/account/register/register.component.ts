import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      username: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
      role: new FormControl<string>('Everyone', Validators.required),
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.registerForm.valid) {
      return;
    }
    var req$ = this.auth.register({
      name: this.registerForm.get('name')!.value,
      username: this.registerForm.get('username')!.value,
      password: this.registerForm.get('password')!.value,
      role: this.registerForm.get('role')!.value,
    });

    await lastValueFrom(req$);

    this.router.navigate(['profile']);
  }

  onCancel(): void {
    this.router.navigate(['home']);
  }
}
