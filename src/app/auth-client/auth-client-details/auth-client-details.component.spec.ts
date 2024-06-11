import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClientDetailsComponent } from './auth-client-details.component';

describe('AuthClientDetailsComponent', () => {
  let component: AuthClientDetailsComponent;
  let fixture: ComponentFixture<AuthClientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthClientDetailsComponent]
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
