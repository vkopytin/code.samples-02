import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthClientDetailsComponent } from './auth-client-details.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthClientDetailsComponent', () => {
  let component: AuthClientDetailsComponent;
  let fixture: ComponentFixture<AuthClientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AuthClientDetailsComponent],
    providers: [provideRouter([]), provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(AuthClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
