import { Photo, Instagram, Job, School, Teaser, SpotifyThemeTrack } from '.';

export interface Suggestion {
  group_matched: boolean;
  distance_mi: number;
  content_hash: string;
  common_connections: any[];
  common_interests: any[];
  connection_count: number;
  _id: string;
  bio: string;
  birth_date: Date;
  name: string;
  ping_time: Date;
  photos: Photo[];
  jobs: Job[];
  schools:  School[];
  teaser: Teaser;
  teasers: Teaser[];
  gender: boolean;
  birth_date_info: string;
  s_number: number;
  instagram?: Instagram;
  spotify_theme_track?: SpotifyThemeTrack;
  is_traveling: boolean;
}
