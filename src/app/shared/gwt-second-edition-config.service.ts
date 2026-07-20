import { Injectable, signal } from '@angular/core';
import type { Tile } from '../models/tile.model';

@Injectable({
  providedIn: 'root',
})
export class GwtSecondEditionConfigService {
  useVariant = signal<{ name: string; checked: boolean } | null>(null);
  useRailsToTheNorth = signal<boolean>(false);
  playerCount = signal<number>(2);

  setUseVariant(variant: { name: string; checked: boolean }): void {
    this.useVariant.set(variant);
  }

  setUseRailsToTheNorth(enabled: boolean): void {
    this.useRailsToTheNorth.set(enabled);
  }

  setPlayerCount(count: number): void {
    this.playerCount.set(count);
  }

  neutralBuildings: Tile[] = [
    { title: 'A', sides: [{ title: 'front' }] },
    { title: 'B', sides: [{ title: 'front' }] },
    { title: 'C', sides: [{ title: 'front' }] },
    { title: 'D', sides: [{ title: 'front' }] },
    { title: 'E', sides: [{ title: 'front' }] },
    { title: 'F', sides: [{ title: 'front' }] },
    { title: 'G', sides: [{ title: 'front' }] },
  ];

  playerBuildings: Tile[] = [
    { title: '1', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '2', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '3', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '4', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '5', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '6', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '7', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '8', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '9', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '10', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '11', sides: [{ title: 'a' }, { title: 'b' }] },
    { title: '12', sides: [{ title: 'a' }, { title: 'b' }] },
  ];

  stationMasters: Tile[] = [
    { title: '1', sides: [{ title: 'front', image: 'img/station-master-01.png' }] },
    { title: '2', sides: [{ title: 'front', image: 'img/station-master-02.png' }] },
    { title: '3', sides: [{ title: 'front', image: 'img/station-master-03.png' }] },
    { title: '4', sides: [{ title: 'front', image: 'img/station-master-04.png' }] },
    { title: '5', sides: [{ title: 'front', image: 'img/station-master-05.png' }] },
    { title: '6', sides: [{ title: 'front', image: 'img/station-master-06.png' }] },
    { title: '7', sides: [{ title: 'front', image: 'img/station-master-07.png' }] },
    { title: '8', sides: [{ title: 'front', image: 'img/station-master-08.png' }] },
    { title: '9', sides: [{ title: 'front', image: 'img/station-master-09.png' }] },
  ];

  getRandomNeutralBuildingOrder(): Tile[] {
    return this.shuffleArray(this.neutralBuildings);
  }

  getRandomStationMasters(): Tile[] {
    const selection: Tile[] = [];
    const shuffledStationMasters = this.shuffleArray(this.stationMasters);

    for (let index = 0; index < 5; index += 1) {
      selection.push(shuffledStationMasters.pop() as Tile);
    }

    return selection;
  }

  getRandomPlayerBuildings(): Tile[] {
    const playerBuildings = JSON.parse(JSON.stringify(this.playerBuildings)) as Tile[];

    playerBuildings.forEach((playerBuilding) => {
      playerBuilding.sides.splice(
        Math.floor(Math.random() * playerBuilding.sides.length),
        1,
      );
    });

    return playerBuildings;
  }

  private shuffleArray<T>(inArray: T[]): T[] {
    const returnArray = inArray.slice();

    for (let index = returnArray.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const current = returnArray[index];
      returnArray[index] = returnArray[swapIndex];
      returnArray[swapIndex] = current;
    }

    return returnArray;
  }
}
