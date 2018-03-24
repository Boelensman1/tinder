import { IncomingMessage } from 'http';
import { TinderClient } from '../classes';

/**
 * The tinder photos (not instagram but the one connected to the profile)
 */
class Photo {
  /**
   * Internal tinder id of the photo
   */
  public id: string;
  /**
   * Url where you can download the photo (you need to authenticate)
   */
  public url: string;
  /**
   * Location of different sizes of the photo
   */
  public processedFiles: [{
    url: string;
    height: number;
    width: number;
  }];
  /**
   * Filename of the photo, not sure if its the original uploadname
   */
  public fileName: string;
  /**
   * Extension, usually .jpg
   */
  public extension:  string;
  /**
   * Wether or not it's the main photograph
   */
  public main?: boolean;
  /**
   * Unsure what this is, probably related to the option to randomly set your
   * most succesfull photo first
   */
  public successRate?: number;
  /**
   * Unsure what this is, probably related to the option to randomly set your
   * most succesfull photo first
   */
  public selectRate?: 0;
  /**
   * Unsure what this is
   */
  public shape?: string;

  constructor(private tinderClient: TinderClient, photodata) {
    this.url = photodata.url;
    this.processedFiles = photodata.processedFiles;
    this.fileName = photodata.fileName;
    this.extension =  photodata.extension;
    if (photodata.main) { this.main = photodata.main; }
    if (photodata.successRate) { this.successRate = photodata.successRate; }
    if (photodata.selectRate) { this.selectRate = photodata.selectRate; }
    if (photodata.shape) { this.shape = photodata.shape; }
  }

  /**
   * Get photo
   */
  public get(): Promise<IncomingMessage> {
    const options = { baseURL: null, responseType: 'stream' };
    return this.tinderClient.doGetRequest(this.url, options, false);
  }
}

export { Photo };
