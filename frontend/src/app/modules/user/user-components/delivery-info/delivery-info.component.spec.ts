import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryInfoComponent } from './delivery-info.component';

describe('DeliveryInfoComponent', () => {
  let component: DeliveryInfoComponent;
  let fixture: ComponentFixture<DeliveryInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryInfoComponent]
    });
    fixture = TestBed.createComponent(DeliveryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
