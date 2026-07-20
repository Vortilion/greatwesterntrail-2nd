import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LocalStorageService } from '../shared/local-storage.service';
import { GwtSecondEditionConfigService } from '../shared/gwt-second-edition-config.service';

import { HomeComponent } from './home.component';

const breakpointObserverMock = {
  observe: () => of({ matches: false }),
};

const localStorageServiceMock = {
  get: () => null,
  set: () => true,
};

const matDialogMock = {
  open: () => ({
    afterClosed: () => of(undefined),
  }),
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(HomeComponent, {
      set: {
        template: '',
      },
    });

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        GwtSecondEditionConfigService,
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
        { provide: LocalStorageService, useValue: localStorageServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
