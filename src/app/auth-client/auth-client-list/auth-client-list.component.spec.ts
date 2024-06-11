import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClientListComponent } from './auth-client-list.component';

describe('AuthClientListComponent', () => {
  let component: AuthClientListComponent;
  let fixture: ComponentFixture<AuthClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthClientListComponent]
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
