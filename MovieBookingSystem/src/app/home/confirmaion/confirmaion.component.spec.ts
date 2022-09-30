import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaionComponent } from './confirmaion.component';

describe('ConfirmaionComponent', () => {
  let component: ConfirmaionComponent;
  let fixture: ComponentFixture<ConfirmaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmaionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
