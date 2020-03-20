import { TestBed } from '@angular/core/testing';

import { InventoryrequestService } from './inventoryrequest.service';

describe('InventoryrequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryrequestService = TestBed.get(InventoryrequestService);
    expect(service).toBeTruthy();
  });
});
