import { TestBed } from '@angular/core/testing';

import { ServicesArrayService } from './services-array.service';

describe('ServicesArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesArrayService = TestBed.get(ServicesArrayService);
    expect(service).toBeTruthy();
  });
});
