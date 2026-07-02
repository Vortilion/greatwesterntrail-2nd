import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionDetectedEvent } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TranslocoModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  title = 'gwt-2nd_randomizer';
  private swUpdate = inject(SwUpdate);
  private snackbar = inject(MatSnackBar);
  private translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.swUpdate.unrecoverable.subscribe((event) => {
      const snackError = this.snackbar.open(
        'An error occurred that we cannot recover from:\n' + event.reason + '\n\nPlease reload the page.',
        'Reload',
      );

      snackError.onAction().subscribe(() => {
        window.location.reload();
      });

      console.debug('An error occurred that we cannot recover from:\n' + event.reason + '\n\nPlease reload the page.');
    });

    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionDetectedEvent => evt.type === 'VERSION_DETECTED'))
      .subscribe(() => {
        const snack = this.snackbar.open(this.translocoService.translate('messages.update-available'), 'Reload');

        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
  }
}
