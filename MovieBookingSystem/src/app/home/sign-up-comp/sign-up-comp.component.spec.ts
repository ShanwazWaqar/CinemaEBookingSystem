import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCompComponent } from './sign-up-comp.component';

describe('SignUpCompComponent', () => {
  let component: SignUpCompComponent;
  let fixture: ComponentFixture<SignUpCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
