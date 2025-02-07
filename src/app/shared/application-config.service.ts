import { EventEmitter, Injectable } from '@angular/core';
import { Tile } from '../models/tile.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationConfigService {
  useSimmental = new EventEmitter<boolean>();

  playerCount = new EventEmitter<number>();
  neutralBuildings: Tile[] = [
    {
      title: 'A',
      sides: [
        {
          title: 'front',
        },
      ],
    },
    {
      title: 'B',
      sides: [
        {
          title: 'front',
        },
      ],
    },
    {
      title: 'C',
      sides: [
        {
          title: 'front',
        },
      ],
    },
    {
      title: 'D',
      sides: [
        {
          title: 'front',
        },
      ],
    },
    {
      title: 'E',
      sides: [
        {
          title: 'front',
        },
      ],
    },
    {
      title: 'F',
      sides: [
        {
          title: 'front',
        },
      ],
    },
    {
      title: 'G',
      sides: [
        {
          title: 'front',
        },
      ],
    },
  ];
  playerBuildings: Tile[] = [
    {
      title: '1',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '2',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '3',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '4',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '5',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '6',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '7',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '8',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '9',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '10',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '11',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
    {
      title: '12',
      sides: [
        {
          title: 'a',
        },
        {
          title: 'b',
        },
      ],
    },
  ];

  stationMasters: Tile[] = [
    {
      title: '1',
      sides: [
        {
          title: 'front',
          image: 'img/station-master-01.png',
        },
      ],
    },
    {
      title: '2',
      sides: [
        {
          title: 'front',
          image: 'img/station-master-02.png',
        },
      ],
    },
    {
      title: '3',
      sides: [
        {
          title: 'front',
          image: 'img/station-master-03.png',
        },
      ],
    },
    {
      title: '4',
      sides: [
        {
          title: 'front',
          image: 'img/station-master-04.png',
        },
      ],
    },
    {
      title: '5',
      sides: [
        {
          title: 'front',
          image: 'img/station-master-05.png',
        },
      ],
    },
    {
      title: '6',
      sides: [
        {
          title: 'front',
          image: 'img/station-master-06.png',
        },
      ],
    },
    {
      title: '7',
      sides: [
        {
          title: 'front',
          image: 'img/station-master-07.png',
        },
      ],
    },
    {
      title: '8',
      sides: [
        {
          title: 'front',
          image: 'img/station-master-08.png',
        },
      ],
    },
  ];

  getRandomNeutralBuildingOrder(): Tile[] {
    return this.shuffleArray(this.neutralBuildings);
  }

  getRandomStationMasters(): Tile[] {
    let selection: Tile[] = [];
    let shuffledStationMasters = this.shuffleArray(this.stationMasters);

    for (let i = 0; i < 5; i++) {
      selection.push(shuffledStationMasters.pop());
    }

    return selection;
  }

  getRandomPlayerBuildings(): Tile[] {
    let playerBuildings = JSON.parse(JSON.stringify(this.playerBuildings));

    playerBuildings.forEach((playerBuilding: Tile) => {
      playerBuilding.sides.splice(
        Math.floor(Math.random() * playerBuilding.sides.length),
        1
      );
    });

    return playerBuildings;
  }

  private shuffleArray(inArray: any[]): any[] {
    let returnArray = inArray.slice();

    for (
      var j, x, i = returnArray.length;
      i;
      j = Math.floor(Math.random() * i),
        x = returnArray[--i],
        returnArray[i] = returnArray[j],
        returnArray[j] = x
    );
    return returnArray;
  }
}
