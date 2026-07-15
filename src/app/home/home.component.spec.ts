import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { provideTransloco } from '@jsverse/transloco';
import { LocalStorageService } from '../shared/local-storage.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    TestBed.resetTestingModule();
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
            observe: () => ({
              subscribe: (callback: (result: { matches: boolean }) => void) => {
                callback({ matches: false });
                return { unsubscribe: () => undefined };
              },
            }),
          },
        },
        {
          provide: MatDialog,
          useValue: {},
        },
        {
          provide: LocalStorageService,
          useValue: {
            get: () => undefined,
            set: () => true,
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
