import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClientComponent } from './auth-client.component';

describe('AuthClientComponent', () => {
  let component: AuthClientComponent;
  let fixture: ComponentFixture<AuthClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
