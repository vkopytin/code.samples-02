import { Routes } from '@angular/router';

import { LoginComponent, ProfileComponent, RegisterComponent } from './account';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { AuthClientDetailsComponent } from './auth-client/auth-client-details/auth-client-details.component';
import { AuthClientListComponent } from './auth-client/auth-client-list/auth-client-list.component';
import { AuthClientComponent } from './auth-client/auth-client.component';
import { UsersListComponent } from './account/profile/users-list/users-list.component';
import { UserDetailsComponent } from './account/profile/user-details/user-details.component';

export const routes: Routes = [{
  path: '',
  children: [{
    path: '', component: HomeComponent
  }, {
    path: 'home', component: HomeComponent,
  },{
    path: 'clients', component: AuthClientComponent,
    data: { breadcrumb: 'Clients' },
    children: [{
      path: '', component: AuthClientListComponent,
      data: { breadcrumb: 'Clients' },
    }, {
      path: 'details', component: AuthClientDetailsComponent,
      data: { breadcrumb: 'Details' }
    }, {
      path: 'details/:clientId', component: AuthClientDetailsComponent,
      data: { breadcrumb: 'Details' }
    }]
  }, {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
    data: { breadcrumb: 'Users' },
    children: [{
      path: '', component: UsersListComponent,
      data: { breadcrumb: 'Users' },
    }, {
      path: 'details', component: UserDetailsComponent,
      data: { breadcrumb: 'details' },
    }, {
      path: 'details/:userId', component: UserDetailsComponent,
      data: { breadcrumb: 'details' },
    }]
  }, {
    path: 'register', component: RegisterComponent
  }, {
    path: 'login', component: LoginComponent, outlet: 'account'
  }, {
    path: '**', redirectTo: ''
  }]
}];
