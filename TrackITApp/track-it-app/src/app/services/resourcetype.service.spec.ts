import { TestBed } from '@angular/core/testing';

import { ResourcetypeService } from './resourcetype.service';

describe('ResourcetypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourcetypeService = TestBed.get(ResourcetypeService);
    expect(service).toBeTruthy();
  });
});
