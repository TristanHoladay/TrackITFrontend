import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTicketsComponent } from './job-tickets.component';

describe('JobTicketsComponent', () => {
  let component: JobTicketsComponent;
  let fixture: ComponentFixture<JobTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
