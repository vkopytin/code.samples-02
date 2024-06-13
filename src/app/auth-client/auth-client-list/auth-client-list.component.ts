import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { ClientModel } from '../../services/models/clientModel';

@Component({
  selector: 'app-auth-client-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth-client-list.component.html',
  styleUrl: './auth-client-list.component.scss'
})
export class AuthClientListComponent implements OnInit {
  allClients?: ClientModel[];
  appToken = { accessToken: '' };

  @Input()
  selectedItem?: ClientModel;

  @Output()
  selectedItemChange = new EventEmitter<ClientModel>();

  constructor(private auth: AuthService, private account: AccountService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    const req$ = this.account.listClients();
    this.allClients = await lastValueFrom(req$);
  }

  selectClient(clientId: string): void {
    this.router.navigate(['details', clientId], { relativeTo: this.activatedRoute });
  }

  clearSelection(): void {
    this.selectedItem = undefined;
  }

  async generateApplicationAccessToken(clientId: string, e: Event): Promise<void> {
    e.stopPropagation();
    const req$ = this.auth.generateApplicationAccessToken(clientId);
    this.appToken = await lastValueFrom(req$);
  }

  async request(): Promise<void> {
    const req$ = this.account.listClients();
    this.allClients = await lastValueFrom(req$);
  }
}
