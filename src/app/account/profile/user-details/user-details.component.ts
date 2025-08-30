import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  userForm!: FormGroup;
  isEdit = false;

  constructor(private activatedRoute: ActivatedRoute, private account: AccountService) {

  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      userName: new FormControl<string>({ value: '', disabled: true }, [Validators.required, Validators.email]),
      name: new FormControl<string>('', Validators.required),
    });

    const email: string | undefined = this.activatedRoute.snapshot.params['userId'];
    if (email) {
      this.isEdit = true;
      const res$ = this.account.getUser(email);
      res$.subscribe(user => {
        this.userForm.patchValue({
          userName: user.userName,
          name: user.name,
        });
      });
    }
  }

  onSubmit(): void {
    console.log(this.userForm.value);
  }
}
