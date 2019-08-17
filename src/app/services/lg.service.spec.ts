import { TestBed } from '@angular/core/testing';

import { LgService } from './lg.service';

describe('LgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LgService = TestBed.get(LgService);
    expect(service).toBeTruthy();
  });
});
