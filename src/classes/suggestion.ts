import {
  Photo,
  Instagram,
  Job,
  School,
  Teaser,
  SpotifyThemeTrack,
} from '../interfaces';

/**
 * The suggestions that tinder gives you (the ones you'd swipe on in the app)
 */
class Suggestion {
  /**
   * Internal tinder id of the suggestion
   */
  id: string;
  /**
   * Wether it's a group or a single person
   */
  groupMatched: boolean;
  /**
   * Distance in miles TODO: figure out if it's actually in miles
   */
  distanceMi: number;
  /**
   * Hash for checking integrity probably
   */
  contentHash: string;
  /**
   * Facebook friends that you have in common
   */
  commonConnections: any[];
  /**
   * Facebook interests (likes) that you have in common
   */
  commonInterests: any[];
  /**
   * Amount of common connections
   */
  connectionCount: number;
  /**
   * Tinder bio
   */
  bio: string;
  /**
   * Birthdate of the suggestion
   */
  birthDate: Date;
  /**
   * Name of the suggestion
   */
  name: string;
  /**
   * Used to be the last time online but now seems to be a fixed date,
   * same for everyone
   */
  pingTime: Date;
  /**
   * The list of photos that the suggestion has on tinder
   */
  photos: Photo[];
  /**
   * The list of jobs that the suggestion has entered on tinder
   */
  jobs: Job[];
  /**
   * The list of schools that the suggestion has entered on tinder
   */
  schools:  School[];
  /**
   * TODO: figure out what this is
   */
  teaser: Teaser;
  /**
   * TODO: figure out what this is
   */
  teasers: Teaser[];
  /**
   * Wether the suggestion is male or female
   */
  isFemale: boolean;
  /**
   * Always the same string
   */
  birthDateInfo: string;
  /**
   * Unsure what this number is
   */
  sNumber: number;
  /**
   * Information about a linked instagram
   */
  instagram?: Instagram;
  /**
   * Spotify anthem
   */
  spotifyThemeTrack?: SpotifyThemeTrack;
  /**
   * Wether or not the person is using tinder passport (I think)
   */
  isTraveling: boolean;

  constructor(input) {
    // transform the output of the tinder api to something more sensible
    this.id = input._id;
    this.groupMatched = input.group_matched;
    this.distanceMi = input.distance_mi;
    this.contentHash = input.content_hash;
    this.commonConnections = input.common_connections;
    this.commonInterests = input.common_interests;
    this.connectionCount = input.connection_count;
    this.bio = input.bio;
    this.birthDate = new Date(input.birth_date);
    this.name = input.name;
    this.pingTime = new Date(input.ping_time);
    this.photos = input.photos;
    this.jobs = input.jobs;
    this.schools = input.schools;
    this.teaser = input.teaser;
    this.teasers = input.teasers;
    this.isFemale = input.gender === 1;
    this.birthDateInfo = input.birth_date_info;
    this.sNumber = input.s_number;
    this.instagram = input.instagram;
    this.spotifyThemeTrack = input.spotify_theme_track;
    this.isTraveling = input.is_traveling;
  }
}

export { Suggestion };
