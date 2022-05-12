import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAbsencePageComponent } from './update-absence-page.component';

describe('UpdateAbsencePageComponent', () => {
  let component: UpdateAbsencePageComponent;
  let fixture: ComponentFixture<UpdateAbsencePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAbsencePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAbsencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
