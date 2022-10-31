import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileSuccessComponent } from './editprofile-success.component';

describe('EditprofileSuccessComponent', () => {
  let component: EditprofileSuccessComponent;
  let fixture: ComponentFixture<EditprofileSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprofileSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprofileSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
