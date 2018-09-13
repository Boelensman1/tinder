import {
  Profile,
  User,
  Photo,
  HttpClient,
  UserMetaData,
} from '../classes';

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
  public async getSuggestions(): Promise<Profile[]> {
    const result = await this.http.get('/user/recs');
    return result.results.map((result) => (new Profile(this, result)));
  }

  /**
   * Get your own meta data (swipes left, people seen, etc..)
   */
  public async getMeta(): Promise<UserMetaData> {
    const result = await this.http.get('/meta');
    return new UserMetaData(this, result);
  }

  /**
   * Get profile data of people, if called with no arguments gives your own
   */
  public async getProfile(id?: string): Promise<Profile|User> {
    // id = null -> get user's own profile
    if (!id) {
      const result = await this.http.get('/profile', false);
      return new User(this, result);
    }
    // get someone else's profile
    const result = await this.http.get(`/user/${id}`);
    return new Profile(this, result.results);
  }
}

export { TinderClient };
