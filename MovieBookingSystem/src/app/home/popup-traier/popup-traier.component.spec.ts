import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTraierComponent } from './popup-traier.component';

describe('PopupTraierComponent', () => {
  let component: PopupTraierComponent;
  let fixture: ComponentFixture<PopupTraierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTraierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupTraierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
