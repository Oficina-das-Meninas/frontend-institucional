import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HOME } from './home';

describe('HOME', () => {
  let component: HOME;
  let fixture: ComponentFixture<HOME>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HOME]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HOME);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
