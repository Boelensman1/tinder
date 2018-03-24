import { Photo } from '../classes';
import { School, Interest } from '../interfaces';

export interface User {
  _id: string;
  active_time: string;
  create_date: string;
  age_filter_max: 32;
  age_filter_min: 22;
  api_token: string;
  banned: boolean;
  bio: string;
  birth_date: string;
  connection_count: 100;
  distance_filter: 50;
  full_name: string;
  groups: string[];
  gender: 0;
  gender_filter: 1;
  interests: Interest[];
  name: string;
  ping_time: string;
  discoverable: boolean;
  photos: Photo[];
  schools: School[];
  squads_discoverable?: boolean;
  squads?: any[]; // TODO: figure out the format of this
  can_create_squad?: boolean;
  squad_ads_shown?: boolean;
}
