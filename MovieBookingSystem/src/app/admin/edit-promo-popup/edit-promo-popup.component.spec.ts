import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromoPopupComponent } from './edit-promo-popup.component';

describe('EditPromoPopupComponent', () => {
  let component: EditPromoPopupComponent;
  let fixture: ComponentFixture<EditPromoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPromoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPromoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
