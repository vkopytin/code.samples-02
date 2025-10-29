import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SitesStructureComponent } from './sites-structure.component';

describe('SitesStructureComponent', () => {
  let component: SitesStructureComponent;
  let fixture: ComponentFixture<SitesStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SitesStructureComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitesStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
