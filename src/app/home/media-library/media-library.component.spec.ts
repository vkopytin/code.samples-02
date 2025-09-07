import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaLibraryComponent } from './media-library.component';
import { MediaLibraryModule } from './media-library.module';

describe('MediaLibraryComponent', () => {
  let component: MediaLibraryComponent;
  let fixture: ComponentFixture<MediaLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaLibraryModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
