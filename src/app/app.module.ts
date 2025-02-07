import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ServiceWorkerModule,
  SwUpdate,
  VersionDetectedEvent,
} from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { HomeComponent } from './home/home.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { TranslocoService } from '@jsverse/transloco';
import { filter } from 'rxjs';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LanguageSelectorComponent,
    PageHeaderComponent,
    PageFooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    TranslocoRootModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    swUpdate: SwUpdate,
    snackbar: MatSnackBar,
    translocoService: TranslocoService
  ) {
    swUpdate.unrecoverable.subscribe((event) => {
      const snackError = snackbar.open(
        'An error occurred that we cannot recover from:\n' +
          event.reason +
          '\n\nPlease reload the page.',
        'Reload'
      );

      snackError.onAction().subscribe(() => {
        window.location.reload();
      });

      console.debug(
        'An error occurred that we cannot recover from:\n' +
          event.reason +
          '\n\nPlease reload the page.'
      );
    });

    swUpdate.versionUpdates
      .pipe(
        filter(
          (evt): evt is VersionDetectedEvent => evt.type === 'VERSION_DETECTED'
        )
      )
      .subscribe(() => {
        const snack = snackbar.open(
          translocoService.translate('messages.update-available'),
          'Reload'
        );

        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
  }
}
