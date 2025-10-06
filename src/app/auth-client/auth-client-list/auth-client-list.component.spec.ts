import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthClientListComponent } from './auth-client-list.component';

describe('AuthClientListComponent', () => {
  let component: AuthClientListComponent;
  let fixture: ComponentFixture<AuthClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [OAuthModule.forRoot(), AuthClientListComponent],
    providers: [provideRouter([]), provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(AuthClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
