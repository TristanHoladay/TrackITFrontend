import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRequestComponent } from './inventory-request.component';

describe('InventoryRequestComponent', () => {
  let component: InventoryRequestComponent;
  let fixture: ComponentFixture<InventoryRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
