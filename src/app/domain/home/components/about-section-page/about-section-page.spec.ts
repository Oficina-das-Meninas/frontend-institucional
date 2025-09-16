import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSectionPage } from './about-section-page';

describe('AboutSectionPage', () => {
  let component: AboutSectionPage;
  let fixture: ComponentFixture<AboutSectionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AboutSectionPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});