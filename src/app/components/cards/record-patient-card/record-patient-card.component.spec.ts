import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPatientCardComponent } from './record-patient-card.component';

describe('RecordPatientCardComponent', () => {
  let component: RecordPatientCardComponent;
  let fixture: ComponentFixture<RecordPatientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordPatientCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
