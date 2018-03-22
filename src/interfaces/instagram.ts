import { InstaPhoto } from '.';

export interface Instagram {
  last_fetch_time: string;
  completed_initial_fetch: boolean;
  photos: InstaPhoto[];
  media_count: number;
  profile_picture: string;
  username: string;
}
