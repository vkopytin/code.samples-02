import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ClientModel, ClientToSave } from './models/clientModel';
import { UserModel, UserToSave } from './models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  domain = 'https://account1.azurewebsites.net';
  //domain = 'https://localhost:3001'
  lastClients?: ClientModel[];
  lastUsers?: UserModel[];

  constructor(private http: HttpClient) { }

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

  index(): Observable<{}> {
    return this.http.get(`${this.domain}/home/index`);
  }
  home(): Observable<{}> {
    return this.http.get(`${this.domain}/home/data`);
  }
  public(): Observable<{}> {
    return this.http.get(`${this.domain}/home/public`);
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

  listUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.domain}/home/list-users`).pipe(
      tap(res => this.lastUsers = res)
    );
  }
}
