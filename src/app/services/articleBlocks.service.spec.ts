import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ArticleBlocksService } from './articleBlocks.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArticleBlocksService', () => {
  let service: ArticleBlocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ArticleBlocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
