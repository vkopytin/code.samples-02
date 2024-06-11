import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClientModel, ClientToSave } from './models/clientToSave';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  domain = 'https://account1.azurewebsites.net';
  //domain = 'https://localhost:3001'

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
    return this.http.get<ClientModel[]>(`${this.domain}/home/list-clients`);
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
}
