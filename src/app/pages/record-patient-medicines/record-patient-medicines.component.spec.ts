import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPatientMedicinesComponent } from './record-patient-medicines.component';

describe('RecordPatientMedicinesComponent', () => {
  let component: RecordPatientMedicinesComponent;
  let fixture: ComponentFixture<RecordPatientMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordPatientMedicinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordPatientMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
