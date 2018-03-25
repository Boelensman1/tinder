import { Suggestion, Photo, HttpClient } from '../classes';
import { UserMetaData } from '../interfaces';

/**
 * The main class containing all the functions
 */
class TinderClient {
  /**
   * Handle to the http http
   */
  public http: HttpClient;


  constructor() {
    this.http = new HttpClient();
  }

  /**
   * Authenticate to tinder
   */
  public async auth(facebookToken: string, facebookId: string): Promise<true> {
    return await this.http.auth(facebookToken, facebookId);
  }

  /**
   * get recommendations
   */
  public async getSuggestions(): Promise<Suggestion[]> {
    const result = await this.http.get('/user/recs');
    return result.results.map((result) => (new Suggestion(this, result)));
  }

  /**
   * Get your own meta data (swipes left, people seen, etc..)
   */
  public async getMeta(): Promise<UserMetaData> {
    const result = await this.http.get('/meta');
    delete result.status;
    return result;
  }
}

export { TinderClient };
