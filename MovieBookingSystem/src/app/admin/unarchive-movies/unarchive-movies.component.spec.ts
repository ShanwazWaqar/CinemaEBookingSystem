import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnarchiveMoviesComponent } from './unarchive-movies.component';

describe('UnarchiveMoviesComponent', () => {
  let component: UnarchiveMoviesComponent;
  let fixture: ComponentFixture<UnarchiveMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnarchiveMoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnarchiveMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
