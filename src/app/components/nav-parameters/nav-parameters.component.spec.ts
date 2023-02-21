import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavParametersComponent } from './nav-parameters.component';

describe('NavParametersComponent', () => {
  let component: NavParametersComponent;
  let fixture: ComponentFixture<NavParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
