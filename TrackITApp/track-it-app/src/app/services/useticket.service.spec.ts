import { TestBed } from '@angular/core/testing';

import { UseticketService } from './useticket.service';

describe('UseticketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UseticketService = TestBed.get(UseticketService);
    expect(service).toBeTruthy();
  });
});
