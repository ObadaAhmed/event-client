import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventbookingsComponent } from './eventbookings.component';

describe('EventbookingsComponent', () => {
  let component: EventbookingsComponent;
  let fixture: ComponentFixture<EventbookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventbookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
