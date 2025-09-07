import { TestBed } from '@angular/core/testing';

import { ArticleBlocksService } from './articleBlocks.service';

describe('ArticleBlocksService', () => {
  let service: ArticleBlocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleBlocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
