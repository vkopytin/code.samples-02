import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditorComponent } from './content-editor.component';
import { ContentEditorModule } from './content-editor.module';

describe('ContentEditorComponent', () => {
  let component: ContentEditorComponent;
  let fixture: ComponentFixture<ContentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentEditorModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
