import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientModel, ClientToSave } from '../../services/models/clientToSave';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { lastValueFrom, take } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-client-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth-client-details.component.html',
  styleUrl: './auth-client-details.component.scss'
})
export class AuthClientDetailsComponent implements OnInit {
  clientForm!: FormGroup;

  @Input()
  get selectedItem(): ClientModel {
    const allowedScopes = this.clientForm.get('allowedScopes')?.value;
    const grantType = this.clientForm.get('grantType')?.value;

    return{
      clientId: this.clientForm.get('clientId')?.value,
      clientName: this.clientForm.get('clientName')?.value,
      clientSecret: this.clientForm.get('clientSecret')?.value,
      allowedScopes: `${allowedScopes}`.split(',') ?? [],
      clientUri: this.clientForm.get('clientUri')?.value,
      grantType: `${grantType}`.split(',') ?? [],
      redirectUri: this.clientForm.get('redirectUri')?.value,
      isActive: this.clientForm.get('isActive')?.value
    };
  }
  set selectedItem(client: ClientModel) {
    this.selectItem(client);
  }

  constructor(private activatedRoute: ActivatedRoute, private auth: AuthService, private account: AccountService) {
  }

  async ngOnInit(): Promise<void> {
    this.clientForm = new FormGroup({
      clientId: new FormControl<string>('platformnet6', Validators.required),
      clientName: new FormControl<string>('', Validators.required),
      clientSecret: new FormControl<string>('', Validators.required),
      allowedScopes: new FormControl<string>('read:files', Validators.required),
      clientUri: new FormControl<string>('https://localhost:3001', Validators.required),
      grantType: new FormControl<string>('code', Validators.required),
      redirectUri: new FormControl<string>('https://localhost:3001/signin-oidc', Validators.required),
      isActive: new FormControl<boolean>(true, Validators.required),
    });

    const id: string | undefined = this.activatedRoute.snapshot.params['id'];
    if (id) {
      const res$ = this.account.getClient(id).pipe(take(1));
      const client = await lastValueFrom(res$);
      this.selectItem(client);
    }
  }

  selectItem(selectedItem: ClientModel): void {
    this.clientForm.patchValue(selectedItem, {});
  }

  async saveClient(): Promise<void> {
    if (!this.clientForm.valid) {
      return;
    }
    const allowedScopes = this.clientForm.get('allowedScopes')?.value;
    const grantType = this.clientForm.get('grantType')?.value;
    const client: ClientToSave = {
      clientId: this.clientForm.get('clientId')?.value,
      clientName: this.clientForm.get('clientName')?.value,
      clientSecret: this.clientForm.get('clientSecret')?.value,
      allowedScopes: `${allowedScopes}`.split(',') ?? [],
      clientUri: this.clientForm.get('clientUri')?.value,
      grantType: `${grantType}`.split(',') ?? [],
      redirectUri: this.clientForm.get('redirectUri')?.value,
      isActive: this.clientForm.get('isActive')?.value
    };
    if (this.selectedItem) {
      const req$ = this.account.saveClient(client);
      this.selectedItem = await lastValueFrom(req$);
    } else {
      const req$ = this.account.createClient(client);
      this.selectedItem = await lastValueFrom(req$);
    }
  }

  clearSelection(): void {
    this.clientForm.patchValue({});
  }
}
