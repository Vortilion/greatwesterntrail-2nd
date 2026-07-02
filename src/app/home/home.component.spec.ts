import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { provideTransloco } from '@jsverse/transloco';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
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
        {
          provide: MatDialog,
          useValue: {},
        },
        {
          provide: StorageMap,
          useValue: {
            get: () => of(undefined),
            set: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
