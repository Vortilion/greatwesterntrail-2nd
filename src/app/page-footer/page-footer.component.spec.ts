/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTransloco } from '@jsverse/transloco';

import { PageFooterComponent } from './page-footer.component';

describe('PageFooterComponent', () => {
  let component: PageFooterComponent;
  let fixture: ComponentFixture<PageFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFooterComponent],
      providers: [
        provideTransloco({
          config: {
            availableLangs: ['de', 'en', 'pl'],
            defaultLang: 'en',
            fallbackLang: 'en',
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageFooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
