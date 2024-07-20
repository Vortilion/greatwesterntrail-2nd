export interface TileSide {
  title: string;
  image?: string;
}

export interface Tile {
  title: string;
  sides: TileSide[];
}
