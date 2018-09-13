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

export interface Global {
  boost_intro_multiplier: number;
  invite_type: string;
  recs_interval: number;
  updates_interval: number;
  recs_size: number;
  matchmaker_default_message: string;
  share_default_text: string;
  boost_decay: number;
  boost_up: number;
  boost_down: number;
  sparks: boolean;
  kontagent: boolean;
  sparks_enabled: boolean;
  kontagent_enabled: boolean;
  mqtt: boolean;
  tinder_sparks: boolean;
  ad_swipe_interval: number;
  fetch_connections: boolean;
  rate_app: boolean;
  app_boy: boolean;
  super_like_alc_mode: number;
  plus: boolean;
  super_like: boolean;
  recs_blend: boolean;
  fireboarding: boolean;
  squads_enabled: boolean;
  squads_extension_length: number;
  squads_expiration_notice: number;
  photo_preview_enabled: boolean;
  discount: boolean;
  boost: boolean;
  boost_duration: number;
  fast_match: boolean;
  fast_match_preview_minimum_time: number;
  fast_match_notif_options: number[];
  fast_match_notif_default: number;
  fast_match_new_count_fetch_interval: number;
  fast_match_boost_new_count_fetch_interval: number;
  fast_match_new_count_threshold: number;
  fast_match_polling_mode: number;
  can_edit_jobs: boolean;
  can_edit_schools: boolean;
  can_add_photos_from_facebook: boolean;
  can_show_common_connections: boolean;
  web_payments_enabled: boolean;
  card_replay: boolean;
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
  globals: Global;
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
    this.globals = input.globals;
    this.tutorials = input.tutorials;
    this.products = input.products;
    this.user = new User(tinderClient, input.user);
  }
}

export { UserMetaData };
