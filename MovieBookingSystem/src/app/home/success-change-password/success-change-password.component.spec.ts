import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessChangePasswordComponent } from './success-change-password.component';

describe('SuccessChangePasswordComponent', () => {
  let component: SuccessChangePasswordComponent;
  let fixture: ComponentFixture<SuccessChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
