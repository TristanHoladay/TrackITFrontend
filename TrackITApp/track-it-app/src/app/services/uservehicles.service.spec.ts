import { TestBed } from '@angular/core/testing';

import { UservehiclesService } from './uservehicles.service';

describe('UservehiclesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UservehiclesService = TestBed.get(UservehiclesService);
    expect(service).toBeTruthy();
  });
});
