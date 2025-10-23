import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMediaComponent } from './article-media.component';

describe('ArticleMediaComponent', () => {
  let component: ArticleMediaComponent;
  let fixture: ComponentFixture<ArticleMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
