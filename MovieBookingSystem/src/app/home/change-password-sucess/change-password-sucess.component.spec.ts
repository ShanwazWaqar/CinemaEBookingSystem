import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordSucessComponent } from './change-password-sucess.component';

describe('ChangePasswordSucessComponent', () => {
  let component: ChangePasswordSucessComponent;
  let fixture: ComponentFixture<ChangePasswordSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordSucessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
