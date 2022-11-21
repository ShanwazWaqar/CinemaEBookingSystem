import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgPopupHomeComponent } from './msg-popup-home.component';

describe('MsgPopupHomeComponent', () => {
  let component: MsgPopupHomeComponent;
  let fixture: ComponentFixture<MsgPopupHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgPopupHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgPopupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
