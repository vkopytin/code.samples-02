import { Routes } from '@angular/router';

import { AcceptShareComponent } from './accept-share.component';
import { LoginComponent, ProfileComponent, RegisterComponent } from './account';
import { PermissionsComponent } from './account/permissions/permissions.component';
import { UserDetailsComponent } from './account/profile/user-details/user-details.component';
import { UsersListComponent } from './account/profile/users-list/users-list.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { AuthClientDetailsComponent } from './auth-client/auth-client-details/auth-client-details.component';
import { AuthClientListComponent } from './auth-client/auth-client-list/auth-client-list.component';
import { AuthClientComponent } from './auth-client/auth-client.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ChannelsComponent } from './catalog/channels/channels.component';
import { SubscriptionsComponent } from './catalog/subscriptions/subscriptions.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { SitesStructureComponent } from './sites-structure/sites-structure.component';

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
    path: 'subscriptions', component: CatalogComponent,
    data: { breadcrumb: 'Subscriptions' },
    children: [{
      path: '', component: SubscriptionsComponent,
      data: { breadcrumb: 'Subscriptions' },
    }, {
      path: 'old-channels', component: ChannelsComponent,
      data: { breadcrumb: 'Old Channels' },
    }]
  }, {
    path: 'account',
    data: { breadcrumb: 'Account' },
    children: [{
      path: 'permissions', component: PermissionsComponent,
      data: { breadcrumb: 'Permissions' }
    }]
  }, {
    path: 'accept-share', component: AcceptShareComponent
  }, {
    path: 'register', component: RegisterComponent
  }, {
    path: 'login', component: LoginComponent, outlet: 'account'
  }, {
    path: 'edit-article/:articleId', component: ArticleEditorComponent
  }, {
    path: 'edit-sites', component: SitesStructureComponent
  }, {
    path: '**', redirectTo: ''
  }]
}];
