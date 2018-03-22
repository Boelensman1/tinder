export interface SpotifyThemeTrack {
  id: string;
  name: string;
  preview_url: string;
  uri: string;
  album: {
    id: string;
    name: string;
    images: [{
      height: number;
      width: number;
      url:  string;
    }];
  };
  artists: [{
    id: string;
    name:  string;
  }];
}
