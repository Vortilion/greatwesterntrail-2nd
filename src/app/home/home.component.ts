import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { TranslocoDirective } from '@jsverse/transloco';
import { map } from 'rxjs/operators';
import { GwtSecondEditionConfigService } from '../shared/gwt-second-edition-config.service';
import { LocalStorageService } from '../shared/local-storage.service';
import { Tile } from '../models/tile.model';
import { PlayerCountOption } from '../models/player-count-option.model';
import { VariantWarningDialogComponent } from '../variant-warning-modal/variant-warning-dialog.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { PageFooterComponent } from '../page-footer/page-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    TranslocoDirective,
    PageHeaderComponent,
    PageFooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    readonly dialog = inject(MatDialog);
  private gwtSecondEditionConfigService = inject(GwtSecondEditionConfigService);
  private responsive = inject(BreakpointObserver);
  private storage = inject(LocalStorageService);

  // State signals
  randomNeutralBuildings = signal<Tile[]>([]);
  randomPlayerBuildings = signal<Tile[]>([]);
  randomStationMasters = signal<Tile[]>([]);
  playerCountList = signal<PlayerCountOption[]>([
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ]);
  isXSmall = toSignal(
    this.responsive.observe(Breakpoints.XSmall).pipe(
      map((result) => result.matches)
    ),
    { initialValue: false }
  );

  isMax1280 = toSignal(
    this.responsive.observe('(max-width: 1280px)').pipe(
      map((result) => result.matches)
    ),
    { initialValue: false }
  );

  playerCount = this.gwtSecondEditionConfigService.playerCount;
  useSimmental = signal<boolean>(false);
  useBrahman = signal<boolean>(false);
  useRailsToTheNorth = this.gwtSecondEditionConfigService.useRailsToTheNorth;


  constructor() {
    const playerCount = this.storage.get<number>('gwt2-playerCount');
    if (typeof playerCount === 'number') {
      this.gwtSecondEditionConfigService.setPlayerCount(playerCount);
    } else {
      this.storage.set('gwt2-playerCount', 2);
    }

    const useSimmental = this.storage.get<boolean>('gwt2-useSimmental');
    if (typeof useSimmental === 'boolean') {
      this.useSimmental.set(useSimmental);
      this.gwtSecondEditionConfigService.setUseVariant({
        name: 'useSimmental',
        checked: useSimmental,
      });
    } else {
      this.storage.set('gwt2-useSimmental', false);
    }

    const useBrahman = this.storage.get<boolean>('gwt2-useBrahman');
    if (typeof useBrahman === 'boolean') {
      this.useBrahman.set(useBrahman);
      this.gwtSecondEditionConfigService.setUseVariant({
        name: 'useBrahman',
        checked: useBrahman,
      });
    } else {
      this.storage.set('gwt2-useBrahman', false);
    }

    const useRailsToTheNorth = this.storage.get<boolean>('gwt2-useRailsToTheNorth');
    if (typeof useRailsToTheNorth === 'boolean') {
      this.gwtSecondEditionConfigService.setUseRailsToTheNorth(useRailsToTheNorth);
    } else {
      this.storage.set('gwt2-useRailsToTheNorth', false);
    }

    this.randomizeSetup();
  }

  openDialog() {
    return this.dialog.open(VariantWarningDialogComponent, {});
  }

  onPlayerCountChange(event: MatSelectChange) {
    const playerCount = Number(event.value);
    this.storage.set('gwt2-playerCount', playerCount);
    this.gwtSecondEditionConfigService.setPlayerCount(playerCount);
  }

  resetVariants(): void {
    const dialogRef = this.openDialog();

    dialogRef.afterClosed().subscribe(() => {
      this.storage.set('gwt2-useSimmental', false);
      this.useSimmental.set(false);

      this.gwtSecondEditionConfigService.setUseVariant({
        name: 'useSimmental',
        checked: false,
      });

      this.storage.set('gwt2-useBrahman', false);
      this.useBrahman.set(false);

      this.gwtSecondEditionConfigService.setUseVariant({
        name: 'useBrahman',
        checked: false,
      });
    });
  }

  onVariantChange(name: string, event: MatSlideToggleChange): void {
    if (
      (this.useBrahman() && name === 'useSimmental' && event.checked) ||
      (this.useSimmental() && name === 'useBrahman' && event.checked)
    ) {
      this.resetVariants();
    } else {
      this.storage.set(`gwt2-${event.source.name}`, event.checked);
      if (name === 'useSimmental') {
        this.useSimmental.set(event.checked);
      } else if (name === 'useBrahman') {
        this.useBrahman.set(event.checked);
      }
      this.gwtSecondEditionConfigService.setUseVariant({
        name,
        checked: event.checked,
      });
    }
  }

  onExpansionChange(event: MatSlideToggleChange) {
    this.storage.set('gwt2-useRailsToTheNorth', event.checked);
    this.gwtSecondEditionConfigService.setUseRailsToTheNorth(event.checked);
  }

  randomizeSetup() {
    this.randomNeutralBuildings.set(
      this.gwtSecondEditionConfigService.getRandomNeutralBuildingOrder(),
    );

    this.randomStationMasters.set(
      this.gwtSecondEditionConfigService.getRandomStationMasters(),
    );

    this.randomPlayerBuildings.set(
      this.gwtSecondEditionConfigService.getRandomPlayerBuildings(),
    );
  }
}
