import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {
  ServiceWorkerModule,
  SwPush,
  SwUpdate,
  VersionDetectedEvent,
  VersionReadyEvent,
} from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { filter } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectorComponent,
    PageHeaderComponent,
    PageFooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    HttpClientModule,
    TranslocoRootModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    swUpdate: SwUpdate,
    snackbar: MatSnackBar,
    translocoService: TranslocoService,
  ) {
    swUpdate.unrecoverable.subscribe((event) => {
      const snackError = snackbar.open(
        'An error occurred that we cannot recover from:\n' +
          event.reason +
          '\n\nPlease reload the page.',
        'Reload',
      );

      snackError.onAction().subscribe(() => {
        window.location.reload();
      });

      console.debug(
        'An error occurred that we cannot recover from:\n' +
          event.reason +
          '\n\nPlease reload the page.',
      );
    });

    swUpdate.versionUpdates
      .pipe(
        filter(
          (evt): evt is VersionDetectedEvent => evt.type === 'VERSION_DETECTED',
        ),
      )
      .subscribe(() => {
        const snack = snackbar.open(
          translocoService.translate('messages.update-available'),
          'Reload',
        );

        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
  }
}
