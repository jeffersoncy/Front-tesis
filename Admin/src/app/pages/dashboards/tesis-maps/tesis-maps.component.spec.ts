import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisMapsComponent } from './tesis-maps.component';

describe('TesisMapsComponent', () => {
  let component: TesisMapsComponent;
  let fixture: ComponentFixture<TesisMapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesisMapsComponent]
    });
    fixture = TestBed.createComponent(TesisMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
