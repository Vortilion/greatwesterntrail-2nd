import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslocoRootModule } from '../transloco/transloco-root.module';

@Component({
  selector: 'app-variant-warning-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    TranslocoRootModule,
  ],
  templateUrl: './variant-warning-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantWarningDialogComponent {
  readonly dialogRef = inject(MatDialogRef<VariantWarningDialogComponent>);
}
