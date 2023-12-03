import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisFormComponent } from './tesis-form.component';

describe('TesisFormComponent', () => {
  let component: TesisFormComponent;
  let fixture: ComponentFixture<TesisFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesisFormComponent]
    });
    fixture = TestBed.createComponent(TesisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
