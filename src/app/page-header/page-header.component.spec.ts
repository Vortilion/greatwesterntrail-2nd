/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { provideTransloco } from '@jsverse/transloco';

import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderComponent],
      providers: [
        provideTransloco({
          config: {
            availableLangs: ['de', 'en', 'pl'],
            defaultLang: 'en',
            fallbackLang: 'en',
          },
        }),
        {
          provide: BreakpointObserver,
          useValue: {
            observe: () => of({ matches: false }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
