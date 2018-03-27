import { SuperLikes } from '../interfaces';
import { User } from '../classes';

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
  likes_remaining: number;
  super_likes: SuperLikes;
}
export interface Version {
  active_text: string;
  age_filter: string;
  matchmaker: string;
  trending: string;
  trending_active_text: string;
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

export interface UserMetaData {
  client_resources: ClientResources;
  notifications: any[]; // TODO: figure out the format of this
  groups: Group[];
  rating: Rating;
  travel: { is_traveling: boolean }; // prob. some extra props when traveling
  purchases: any[]; // TODO: figure out the format of this
  versions: Version[];
  globals: Global;
  tutorials: string[];
  products: Products;
  user: User;
}
