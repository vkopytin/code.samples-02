import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, lastValueFrom, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClientModel, ClientToSave } from './models/clientModel';
import { RoleModel } from './models/roleModel';
import { UserModel, UserToSave } from './models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  domain: string = environment.account.domain;
  lastClients: ClientModel[] = [];
  lastUsers: UserModel[] = [];
  lastRoles: RoleModel[] = [];

  constructor(private http: HttpClient) { }

  healthCheck(): Promise<{}> {
    const req = this.http.get(`${this.domain}/health`, {
      responseType: 'text',
    }).pipe(
      catchError(() => { return of('not ready'); })
    );

    return lastValueFrom(req);
  }

  getClient(clientId: string): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.domain}/home/client/${clientId}`);
  }

  createClient(client: ClientToSave): Observable<ClientToSave> {
    return this.http.post<ClientToSave>(`${this.domain}/home/create-client`, client);
  }

  saveClient(client: ClientToSave): Observable<ClientToSave> {
    return this.http.put<ClientToSave>(`${this.domain}/home/save-client`, client);
  }

  listClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.domain}/home/list-clients`).pipe(
      tap(res => this.lastClients = res)
    );
  }

  getUser(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.domain}/home/user/${userId}`);
  }

  createUser(user: UserToSave): Observable<UserToSave> {
    return this.http.post<UserToSave>(`${this.domain}/home/create-user`, user);
  }

  saveUser(client: UserToSave): Observable<UserToSave> {
    return this.http.put<UserToSave>(`${this.domain}/home/save-user`, client);
  }

  listUsers(from=0, limit=10): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.domain}/home/list-users`, {
      params: { from, limit },
    }).pipe(
      tap(res => this.lastUsers = res)
    );
  }

  listRoles(from=0, limit=10): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${this.domain}/home/list-roles`, {
      params: { from, limit },
    }).pipe(
      tap(res => this.lastRoles = res)
    );
  }
}
