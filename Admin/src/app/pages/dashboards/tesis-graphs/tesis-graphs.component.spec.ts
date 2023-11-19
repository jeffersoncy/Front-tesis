import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisGraphsComponent } from './tesis-graphs.component';

describe('TesisGraphsComponent', () => {
  let component: TesisGraphsComponent;
  let fixture: ComponentFixture<TesisGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesisGraphsComponent]
    });
    fixture = TestBed.createComponent(TesisGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
