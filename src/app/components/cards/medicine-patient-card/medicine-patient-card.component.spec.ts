import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinePatientCardComponent } from './medicine-patient-card.component';

describe('MedicinePatientCardComponent', () => {
  let component: MedicinePatientCardComponent;
  let fixture: ComponentFixture<MedicinePatientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinePatientCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinePatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
