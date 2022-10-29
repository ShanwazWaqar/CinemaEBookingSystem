import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassSuccessComponent } from './reset-pass-success.component';

describe('ResetPassSuccessComponent', () => {
  let component: ResetPassSuccessComponent;
  let fixture: ComponentFixture<ResetPassSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPassSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPassSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
