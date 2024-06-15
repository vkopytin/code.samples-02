import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

    });

    const id: string | undefined = this.activatedRoute.snapshot.params['clientId'];
    if (id) {
      this.isEdit = true;
    }
  }
}
