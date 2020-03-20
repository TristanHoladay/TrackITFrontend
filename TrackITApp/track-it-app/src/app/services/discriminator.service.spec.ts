import { TestBed } from '@angular/core/testing';

import { DiscriminatorService } from './discriminator.service';

describe('DiscriminatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscriminatorService = TestBed.get(DiscriminatorService);
    expect(service).toBeTruthy();
  });
});
