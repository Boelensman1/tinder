import { Coordinate } from '../interfaces';

export interface CityInfo {
  name: string;
  bounds: {
    NE: Coordinate;
    SW: Coordinate;
  };
}
