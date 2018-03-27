import { CityInfo } from '../interfaces';

export interface CountryInfo extends CityInfo {
  countryCode: string;
}

