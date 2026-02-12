import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordBookComponent } from './word-book.component';

describe('WordBookComponent', () => {
  let component: WordBookComponent;
  let fixture: ComponentFixture<WordBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
