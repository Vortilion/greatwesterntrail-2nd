import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { TranslocoModule } from '@jsverse/transloco';
import { ApplicationConfigService } from '../shared/application-config.service';
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
    TranslocoModule,
    PageHeaderComponent,
    PageFooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  randomNeutralBuildings!: Tile[];
  randomPlayerBuildings!: Tile[];
  randomStationMasters!: Tile[];
  playerCount!: number;
  playerCountList!: PlayerCountOption[];
  isXSmall!: boolean;
  isMax1280!: boolean;
  useSimmental!: boolean;
  useBrahman!: boolean;
  useRailsToTheNorth!: boolean;
  readonly dialog = inject(MatDialog);
  private applicationConfigService = inject(ApplicationConfigService);
  private responsive = inject(BreakpointObserver);
  private storage = inject(LocalStorageService);

  ngOnInit(): void {
    this.playerCount = 2;
    this.playerCountList = [
      {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
      {
        label: '4',
        value: 4,
      },
    ];

    this.useSimmental = false;
    this.useRailsToTheNorth = false;
    this.useBrahman = false;

    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      if (result.matches) {
        this.isXSmall = true;
      } else {
        this.isXSmall = false;
      }
    });

    this.responsive.observe('(max-width: 1280px)').subscribe((result) => {
      if (result.matches) {
        this.isMax1280 = true;
      } else {
        this.isMax1280 = false;
      }
    });

    const playerCount = this.storage.get<number>('rar-playerCount');
    if (playerCount && typeof playerCount === 'number') {
      this.emitPlayerCount(playerCount);
    } else {
      this.storage.set('rar-playerCount', 2);
    }

    const useSimmental = this.storage.get<boolean>('rar-useSimmental');
    if (this.useSimmental !== undefined && typeof useSimmental === 'boolean') {
      this.applicationConfigService.useVariant.emit({
        name: 'useSimmental',
        checked: useSimmental,
      });
    } else {
      this.storage.set('rar-useSimmental', false);
    }

    const useBrahman = this.storage.get<boolean>('rar-useBrahman');
    if (this.useSimmental !== undefined && typeof useBrahman === 'boolean') {
      this.applicationConfigService.useVariant.emit({
        name: 'useBrahman',
        checked: useBrahman,
      });
    } else {
      this.storage.set('rar-useBrahman', false);
    }

    const useRailsToTheNorth = this.storage.get<boolean>('rar-useRailsToTheNorth');
    if (
      useRailsToTheNorth !== undefined &&
      typeof useRailsToTheNorth === 'boolean'
    ) {
      this.applicationConfigService.useRailsToTheNorth.emit(useRailsToTheNorth);
    } else {
      this.storage.set('rar-useRailsToTheNorth', false);
    }

    this.applicationConfigService.playerCount.subscribe(
      (playerCount: number) => {
        this.playerCount = playerCount;
      },
    );

    this.applicationConfigService.useVariant.subscribe((event) => {
      if (event.name === 'useSimmental') {
        this.useSimmental = event.checked;
      } else if (event.name === 'useBrahman') {
        this.useBrahman = event.checked;
      }
    });

    this.applicationConfigService.useRailsToTheNorth.subscribe(
      (useRailsToTheNorth: boolean) => {
        this.useRailsToTheNorth = useRailsToTheNorth;
      },
    );

    this.randomizeSetup();
  }

  openDialog() {
    return this.dialog.open(VariantWarningDialogComponent, {});
  }

  emitPlayerCount(playerCount: number) {
    this.applicationConfigService.playerCount.emit(playerCount);
  }

  onPlayerCountChange(event: MatSelectChange) {
    this.storage.set('rar-playerCount', event.value);
    this.emitPlayerCount(event.value);
  }

  resetVariants() {
    const dialogRef = this.openDialog();

    dialogRef.afterClosed().subscribe(() => {
      this.storage.set('rar-useSimmental', false);
      this.useSimmental = false;

      this.applicationConfigService.useVariant.emit({
        name: 'useSimmental',
        checked: false,
      });

      this.storage.set('rar-useBrahman', false);
      this.useBrahman = false;

      this.applicationConfigService.useVariant.emit({
        name: 'useBrahman',
        checked: false,
      });
    });
  }

  onVariantChange(name: string, event: MatSlideToggleChange) {
    if (
      (this.useBrahman && name === 'useSimmental' && event.checked) ||
      (this.useSimmental && name === 'useBrahman' && event.checked)
    ) {
      this.resetVariants();
    } else {
      this.storage.set(`rar-${event.source.name}`, event.checked);

      this.applicationConfigService.useVariant.emit({
        name: name,
        checked: event.checked,
      });
    }
  }

  onExpansionChange(event: MatSlideToggleChange) {
    this.storage.set('rar-useRailsToTheNorth', event.checked);
    this.applicationConfigService.useRailsToTheNorth.emit(event.checked);
  }

  randomizeSetup() {
    this.randomNeutralBuildings =
      this.applicationConfigService.getRandomNeutralBuildingOrder();

    this.randomStationMasters =
      this.applicationConfigService.getRandomStationMasters();

    this.randomPlayerBuildings =
      this.applicationConfigService.getRandomPlayerBuildings();
  }
}
