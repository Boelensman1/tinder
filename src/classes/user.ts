import { ProfileCore, TinderClient } from '../classes';

interface Coordinate {
  lat: number;
  lon: number;
}

interface CityInfo {
  name: string;
  bounds: {
    NE: Coordinate;
    SW: Coordinate;
  };
}

interface CountryInfo extends CityInfo {
  countryCode: string;
}

const parseCityInfo = (input: any) => ({
  name: input.name,
  bounds: {
    NE: {
      lat: input.bounds.ne.lat,
      lon: input.bounds.ne.lng,
    },
    SW: {
      lat: input.bounds.sw.lat,
      lon: input.bounds.sw.lng,
    },
  },
});

const parseCountryInfo = (input: any) => ({
  ...parseCityInfo(input),
  countryCode: input.cc,
});

/**
 * Information about the user's own profile
 */
class User extends ProfileCore {
  /**
   * When the user created its tinder profile
   */
  createDate: Date;
  /**
   * Token to authenticate to the api
   */
  apiToken: string;
  /**
   * If the user is banned
   */
  banned: boolean;
  /**
   * Full name of the user
   */
  fullName: string;
  /**
   * Groups that the user is in
   */
  groups: string[];
  /**
   * Squads that the user is in
   */
  squads?: any[]; // TODO: figure out the format of this
  /**
   * Wether the user can create a squad
   */
  canCreateSquads?: boolean;
  /**
   * Unsure, something ad related I guess
   */
  squadAdsShown?: boolean;
  /**
   * Current position
   */
  currentPosition?: { at: number, lat: number; lon: number };
  /**
   * Current city
   */
  currentCity?: CityInfo;
  /**
   * Current country
   */
  currentCountry?: CountryInfo;
  /**
   * Distance in km to search in
   */
  maxDistance: number;
  /**
   * Wether or not the profile is public
   */
  discoverable: boolean;

  constructor(tinderClient: TinderClient, input) {
    super(tinderClient, input);
    // transform the output of the tinder api to something more sensible
    this.createDate = new Date(input.create_date);
    this.apiToken = input.api_token;
    this.banned = input.banned;
    this.fullName = input.full_name;
    this.groups = input.groups;
    this.squads = input.squads;
    this.squadAdsShown = input.squadAdsShown;
    this.maxDistance = input.distance_filter;
    this.discoverable = input.discoverable;
    this.canCreateSquads = input.can_create_squad;
    if (input.pos) { this.currentPosition = input.pos; }
    if (input.pos_info && input.pos_info.city) {
      this.currentCity = parseCityInfo(input.pos_info.city);
    }
    if (input.pos_info && input.pos_info.country) {
      this.currentCountry = parseCountryInfo(input.pos_info.country);
    }
  }
}

export { User };
