import { TestBed } from '@angular/core/testing';

import { LorService } from './lor.service';

describe('LorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LorService = TestBed.get(LorService);
    expect(service).toBeTruthy();
  });
});
