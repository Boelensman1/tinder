import { IncomingMessage } from 'http';

export interface InstagramPhotoData {
  image: string;
  thumbnail: string;
  ts: number;
  link: string;
}

/**
 * The instagram photos
 */
class InstagramPhoto {
  /**
   * Not sure what this is, looks like an id
   */
  public ts: number;
  /**
   * The url of the photo
   */
  public image: string;
  /**
   * Smaller version of the photo
   */
  public thumbnail: string;
  /**
   * Link to the public version of the photo where you can find comments etc
   */
  public link: string;

  constructor(instagramPhotoData: InstagramPhotoData) {
    this.ts = instagramPhotoData.ts;
    this.image = instagramPhotoData.image;
    this.thumbnail = instagramPhotoData.thumbnail;
    this.link = instagramPhotoData.link;
  }
}

export { InstagramPhoto };
