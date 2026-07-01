/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { provideTransloco } from '@jsverse/transloco';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), AppComponent],
      providers: [
        provideTransloco({
          config: {
            availableLangs: ['de', 'en', 'pl'],
            defaultLang: 'en',
            fallbackLang: 'en',
          },
        }),
        {
          provide: SwUpdate,
          useValue: {
            unrecoverable: { subscribe: () => void 0 },
            versionUpdates: { pipe: () => ({ subscribe: () => void 0 }) },
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: () => ({ onAction: () => ({ subscribe: () => void 0 }) }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gwt-2nd_randomizer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gwt-2nd_randomizer');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
