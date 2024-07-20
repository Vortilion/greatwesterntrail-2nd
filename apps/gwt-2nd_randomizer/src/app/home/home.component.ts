import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ApplicationConfigService } from '../shared/application-config.service';
import { Tile } from '../models/tile.model';
import { StorageMap } from '@ngx-pwa/local-storage';
import { PlayerCountOption } from '../models/player-count-option.model';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  randomNeutralBuildings: Tile[];
  randomPlayerBuildings: Tile[];
  randomStationMasters: Tile[];
  playerCount!: number;
  playerCountList!: PlayerCountOption[];
  isXSmall: boolean;
  isMax1280: boolean;
  useSimmental!: boolean;

  constructor(
    private applicationConfigService: ApplicationConfigService,
    private responsive: BreakpointObserver,
    private storage: StorageMap,
  ) {}

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

    this.storage.get('rar-playerCount').subscribe((playerCount) => {
      playerCount && typeof playerCount === 'number'
        ? this.emitPlayerCount(playerCount)
        : this.storage.set('rar-playerCount', 2).subscribe(() => {});
    });

    this.storage.get('rar-useSimmental').subscribe((useSimmental) => {
      useSimmental !== undefined && typeof useSimmental === 'boolean'
        ? this.applicationConfigService.useSimmental.emit(useSimmental)
        : this.storage.set('rar-useSimmental', false).subscribe(() => {});
    });

    this.applicationConfigService.playerCount.subscribe(
      (playerCount: number) => {
        this.playerCount = playerCount;
      },
    );

    this.applicationConfigService.useSimmental.subscribe(
      (useSimmental: boolean) => {
        this.useSimmental = useSimmental;
      },
    );

    this.randomizeSetup();
  }

  emitPlayerCount(playerCount: any) {
    this.applicationConfigService.playerCount.emit(playerCount);
  }

  onPlayerCountChange(event: MatSelectChange) {
    this.storage.set('rar-playerCount', event.value).subscribe(() => {});
    this.emitPlayerCount(event.value);
  }

  onVariantChange(event: MatSlideToggleChange) {
    this.storage.set('rar-useSimmental', event.checked).subscribe(() => {});
    this.applicationConfigService.useSimmental.emit(event.checked);
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
