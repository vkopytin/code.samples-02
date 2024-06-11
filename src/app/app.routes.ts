import { Routes } from '@angular/router';

import { LoginComponent, ProfileComponent, RegisterComponent } from './account';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { AuthClientDetailsComponent } from './auth-client/auth-client-details/auth-client-details.component';
import { AuthClientListComponent } from './auth-client/auth-client-list/auth-client-list.component';
import { AuthClientComponent } from './auth-client/auth-client.component';

export const routes: Routes = [{
  path: '',
  children: [{
    path: '', component: HomeComponent
  }, {
    path: 'home', component: HomeComponent,
  },{
    path: 'clients', component: AuthClientComponent,
    data: { breadcrumb: 'List' },
    children: [{
      path: '', component: AuthClientListComponent,
      data: { breadcrumb: 'List' },
    }, {
      path: 'details', component: AuthClientDetailsComponent,
      data: { breadcrumb: 'Details' }
    }, {
      path: 'details/:id', component: AuthClientDetailsComponent,
      data: { breadcrumb: 'Details' }
    }]
  }, {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  }, {
    path: 'register', component: RegisterComponent
  }, {
    path: 'login', component: LoginComponent, outlet: 'account'
  }, {
    path: '**', redirectTo: ''
  }]
}];
