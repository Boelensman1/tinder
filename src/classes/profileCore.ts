import {
  Job,
  School,
  Teaser,
  SpotifyThemeTrack,
  SuperLikes,
} from '../interfaces';

import { Photo, TinderClient, Instagram } from '../classes';

/**
 * Superclass for profile & user
 */
class ProfileCore {
  /**
   * Internal tinder id of the profile
   */
  id: string;
  /**
   * Amount of common connections
   */
  connectionCount: number;
  /**
   * Tinder bio
   */
  bio: string;
  /**
   * Birthdate of the profile
   */
  birthDate: Date;
  /**
   * Name of the profile
   */
  name: string;
  /**
   * Used to be the last time online but now seems to be a fixed date,
   * same for everyone
   */
  pingTime: Date;
  /**
   * The list of photos that the profile has on tinder
   */
  photos: Photo[];
  /**
   * The list of jobs that the profile has entered on tinder
   */
  jobs: Job[];
  /**
   * The list of schools that the profile has entered on tinder
   */
  schools:  School[];
  /**
   * Wether the profile is male or female
   */
  isFemale: boolean;
  /**
   * Always the same string
   */
  birthDateInfo: string;
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

  constructor(protected tinderClient: TinderClient, input) {
    // transform the output of the tinder api to something more sensible
    this.id = input._id;
    this.connectionCount = input.connection_count;
    this.bio = input.bio;
    this.birthDate = new Date(input.birth_date);
    this.name = input.name;
    this.pingTime = new Date(input.ping_time);
    this.photos = input.photos.map((input) => (new Photo(tinderClient, input)));
    this.jobs = input.jobs;
    this.schools = input.schools;
    this.isFemale = input.gender === 1;
    this.birthDateInfo = input.birth_date_info;
    if (input.instagram) { this.instagram = new Instagram(input.instagram); }
    this.spotifyThemeTrack = input.spotify_theme_track;
    this.isTraveling = input.is_traveling;
  }
}

export { ProfileCore };
