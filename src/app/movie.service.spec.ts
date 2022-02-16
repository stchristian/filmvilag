import { TestBed } from '@angular/core/testing';

import { MovieDbService } from './movie.service';

describe('MovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieDbService = TestBed.get(MovieDbService);
    expect(service).toBeTruthy();
  });
});
