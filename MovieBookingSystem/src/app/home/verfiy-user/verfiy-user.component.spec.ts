import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyUserComponent } from './verfiy-user.component';

describe('VerfiyUserComponent', () => {
  let component: VerfiyUserComponent;
  let fixture: ComponentFixture<VerfiyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerfiyUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerfiyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
