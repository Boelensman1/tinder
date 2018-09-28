import { User, TinderClient } from '../classes';
import { SuperLikes } from '../interfaces';

export interface ClientResources {
  rate_card: { carousel: [{ slug: string }] };
  plus_screen: string[];
}

export interface Group {
  type: string;
  sub_type: string;
  key: string;
  group_id: string;
  version: number;
  is_primary?: boolean;
}

export interface Rating {
  likesRemaining: number;
  superLikes: SuperLikes;
}
export interface Version {
  activeText: string;
  ageFilter: string;
  matchmaker: string;
  trending: string;
  trendingActiveText: string;
}

/* tslint:disable:completed-docs */
// TODO: add documentation for this class
export class Globals {
  boostIntroMultiplier: number;
  inviteType: string;
  recsInterval: number;
  updatesInterval: number;
  recsSize: number;
  matchmakerDefaultMessage: string;
  shareDefaultText: string;
  boostDecay: number;
  boostUp: number;
  boostDown: number;
  sparks: boolean;
  kontagent: boolean;
  sparksEnabled: boolean;
  kontagentEnabled: boolean;
  mqtt: boolean;
  tinderSparks: boolean;
  adSwipeInterval: number;
  fetchConnections: boolean;
  rateApp: boolean;
  appBoy: boolean;
  superLikeAlcMode: number;
  plus: boolean;
  superLike: boolean;
  recsBlend: boolean;
  fireboarding: boolean;
  squadsEnabled: boolean;
  squadsExtensionLength: number;
  squadsExpirationNotice: number;
  photoPreviewEnabled: boolean;
  discount: boolean;
  boost: boolean;
  boostDuration: number;
  fastMatch: boolean;
  fastMatchPreviewMinimumTime: number;
  fastMatchNotifOptions: number[];
  fastMatchNotifDefault: number;
  fastMatchNewCountFetchInterval: number;
  fastMatchBoostNewCountFetchInterval: number;
  fastMatchNewCountThreshold: number;
  fastMatchPollingMode: number;
  canEditJobs: boolean;
  canEditSchools: boolean;
  canAddPhotosFromFacebook: boolean;
  canShowCommonConnections: boolean;
  webPaymentsEnabled: boolean;
  cardReplay: boolean;
  /* tslint:enable */


  constructor(input) {
    this.boostIntroMultiplier = input.boost_intro_multiplier;
    this.inviteType = input.invite_type;
    this.recsInterval = input.recs_interval;
    this.updatesInterval = input.updates_interval;
    this.recsSize = input.recs_size;
    this.matchmakerDefaultMessage = input.matchmaker_default_message;
    this.shareDefaultText = input.share_default_text;
    this.boostDecay = input.boost_decay;
    this.boostUp = input.boost_up;
    this.boostDown = input.boost_down;
    this.sparks = input.sparks;
    this.kontagent = input.kontagent;
    this.sparksEnabled = input.sparks_enabled;
    this.kontagentEnabled = input.kontagent_enabled;
    this.mqtt = input.mqtt;
    this.tinderSparks = input.tinder_sparks;
    this.adSwipeInterval = input.ad_swipe_interval;
    this.fetchConnections = input.fetch_connections;
    this.rateApp = input.rate_app;
    this.appBoy = input.app_boy;
    this.superLikeAlcMode = input.super_like_alc_mode;
    this.plus = input.plus;
    this.superLike = input.super_like;
    this.recsBlend = input.recs_blend;
    this.fireboarding = input.fireboarding;
    this.squadsEnabled = input.squads_enabled;
    this.squadsExtensionLength = input.squads_extension_length;
    this.squadsExpirationNotice = input.squads_expiration_notice;
    this.photoPreviewEnabled = input.photo_preview_enabled;
    this.discount = input.discount;
    this.boost = input.boost;
    this.boostDuration = input.boost_duration;
    this.fastMatch = input.fast_match;
    this.fastMatchPreviewMinimumTime = input.fast_match_preview_minimum_time;
    this.fastMatchNotifOptions = input.fast_match_notif_options;
    this.fastMatchNotifDefault = input.fast_match_notif_default;

    this.fastMatchNewCountFetchInterval = input.
      fast_match_new_count_fetch_interval;
    this.fastMatchBoostNewCountFetchInterval = input.
      fast_match_boost_new_count_fetch_interval;

    this.fastMatchNewCountThreshold = input.fast_match_new_count_threshold;
    this.fastMatchPollingMode = input.fast_match_polling_mode;
    this.canEditJobs = input.can_edit_jobs;
    this.canEditSchools = input.can_edit_schools;
    this.canAddPhotosFromFacebook = input.can_add_photos_from_facebook;
    this.canShowCommonConnections = input.can_show_common_connections;
    this.webPaymentsEnabled = input.web_payments_enabled;
    this.cardReplay = input.card_replay;
  }
}

export interface Sku {
  product_type: string;
  purchase_type: string;
  product_id: string;
  amount: number;
  is_base_group: boolean;
}

export interface Products {
  superlike: {
    regular: { skus: Sku[] };
  };
  boost: {
    regular: { skus: Sku[] };
  };
  plus: {
    regular: { skus: Sku[] };
  };
  gold: {
    regular: { skus: Sku[] };
  };
}

export interface Travel {
  isTraveling: boolean;
}

/**
 * The extended metadata information that Tinder gives
 */
class UserMetaData {
  /**
   * Unsure what exactly this is
   */
  clientResources: ClientResources; // TODO: parse this further
  /**
   * Incoming notifications
   */
  notifications: any[]; // TODO: figure out the format of this
  /**
   * Available purchases
   */
  groups: Group[];
  /**
   * Information about remaining likes & superlikes
   */
  rating: Rating;
  /**
   * Wether or not the user is traveling (and probably where to)
   */
  travel: Travel; // TODO: actually travel and find out the extra props
  /**
   * What the user has purchased
   */
  purchases: any[]; // TODO: figure out the format of this
  /**
   * Version info for the different parts of tinder
   */
  versions: Version;
  /**
   * Tinder settings
   */
  globals: Globals;
  /**
   * Either tutorials done or tutorials availabe
   * TODO: figure out which one it is
   */
  tutorials: string[];
  /**
   * Available products to purchase (like superlike, boost etc.)
   */
  products: Products;
  /**
   * The regular user information
   */
  user: User;

  constructor(tinderClient: TinderClient, input) {
    this.clientResources = input.client_resources;
    this.notifications = input.notifications;
    this.groups = input.groups;

    const sl = input.rating.super_likes;
    this.rating = {
      likesRemaining: input.rating.likes_remaining,
      superLikes: {
        remaining: sl.remaining,
        alcRemaining: sl.alc_remaining,
        newAlcRemaining: sl.new_alc_remaining,
        allotment: sl.allotment,
        superlikeRefreshAmount: sl.superlike_refresh_amount,
        superlikeRefreshInterval: sl.superlike_refresh_interval,
        superlikeRefreshIntervalUnit: sl.superlike_refresh_interval_unit,
        resetsAt: sl.resets_at && new Date(sl.resets_at),
      },
    };
    this.travel = { isTraveling: input.travel.is_traveling } ;
    this.purchases = input.purchases;
    this.versions = {
      activeText: input.versions.active_text,
      ageFilter: input.versions.age_filter,
      matchmaker: input.versions.matchmaker,
      trending: input.versions.trending,
      trendingActiveText: input.versions.trending_active_text,
    };
    this.globals = new Globals(input.globals);
    this.tutorials = input.tutorials;
    this.products = input.products;
    this.user = new User(tinderClient, input.user);
  }
}

export { UserMetaData };
