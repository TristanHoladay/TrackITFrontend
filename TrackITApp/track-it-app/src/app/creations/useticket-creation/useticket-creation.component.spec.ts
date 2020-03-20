import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseticketCreationComponent } from './useticket-creation.component';

describe('UseticketCreationComponent', () => {
  let component: UseticketCreationComponent;
  let fixture: ComponentFixture<UseticketCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseticketCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseticketCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
