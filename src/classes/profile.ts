import {
  Job,
  School,
  Teaser,
  SpotifyThemeTrack,
  SuperLikes,
} from '../interfaces';

import { Photo, TinderClient, ProfileCore } from '../classes';

/**
 * The profiles that tinder gives you (the ones you'd swipe on in the app)
 */
class Profile extends ProfileCore {
  /**
   * Wether it's a group or a single person
   */
  groupMatched?: boolean;
  /**
   * Distance in miles TODO: figure out if it's actually in miles
   */
  distanceMi: number;
  /**
   * Hash for checking integrity probably
   */
  contentHash?: string;
  /**
   * Facebook friends that you have in common
   */
  commonConnections: any[];
  /**
   * Facebook interests (likes) that you have in common
   */
  commonInterests: any[];
  /**
   * Unsure what this number is
   */
  sNumber: number;
  /**
   * TODO: figure out what this is
   */
  teaser: Teaser;
  /**
   * TODO: figure out what this is
   */
  teasers: Teaser[];

  constructor(tinderClient: TinderClient, input) {
    super(tinderClient, input);
    // transform the output of the tinder api to something more sensible
    this.groupMatched = input.group_matched;
    this.distanceMi = input.distance_mi;
    this.contentHash = input.content_hash;
    this.commonConnections = input.common_connections;
    this.commonInterests = input.common_interests;
    this.sNumber = input.s_number;
    this.teaser = input.teaser;
    this.teasers = input.teasers;
  }

  /**
   * Like profile
   */
  public async like(): Promise<{isMatch: boolean; likesRemaining: number}> {
    const match = await this.tinderClient.http.get(`/like/${this.id}`, false);
    return { isMatch: match.match, likesRemaining: match.likes_remaining };
  }

  /**
   * superlike profile
   */
  public async superLike(): Promise<{isMatch:boolean; superLikes:SuperLikes}> {
    const match = await this.tinderClient.http.post(`/like/${this.id}/super`);
    return { isMatch: match.match, superLikes: match.super_likes };
  }

  /**
   * Pass profile
   */
  public async pass(): Promise<true> {
    await this.tinderClient.http.get(`/pass/${this.id}`);
    return true;
  }
}

export { Profile };
