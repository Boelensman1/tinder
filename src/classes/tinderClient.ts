import axios from 'axios';
import { IncomingMessage } from 'http';

import { Suggestion, Photo } from '../classes';
import { UserMetaData } from '../interfaces';

const clientConfig = {
  baseURL: 'https://api.gotinder.com',
  timeout: 16000,
  headers: {
    'User-Agent': 'Tinder Android Version 4.5.5',
    os_version: '23',
    platform: 'android',
    'app-version': '854',
    'Accept-Language': 'en',
  },
};

/**
 * The main class containing all the functions
 */
class TinderClient {
  /**
   * Handle to the axios client
   */
  private client: any;
  /**
   * Tinder auth token
   */
  private authToken: string;

  constructor() {
    this.client = axios.create(clientConfig);
  }

  /**
   * Authenticate to tinder
   */
  public auth(facebookToken: string, facebookId: string): Promise<any> {
    return this.client.post('/auth', {
      facebook_token: facebookToken,
      facebook_id: facebookId,
    }).then((response) => (response.data.user.api_token)).then((token) => {
      this.authToken = token;

      // add x-auth token to the client settings
      this.client = axios.create({
        ...clientConfig,
        headers: {
          ...clientConfig.headers,
          'X-Auth-Token': this.authToken,
        },
      });

      return true;
    });
  }

  /**
   * get recommendations
   */
  public getSuggestions(): Promise<Suggestion[]> {
    return this.doGetRequest('/user/recs').then((result) => {
      return result.results.map((result) => (new Suggestion(this, result)));
    });
  }

  /**
   * Get your own meta data (swipes left, people seen, etc..)
   */
  public getMeta(): Promise<UserMetaData> {
    return this.doGetRequest('/meta').then((result) => {
      delete result.status;
      return result;
    });
  }

  /**
   * Do a get request using the axios client
   */
  public doGetRequest(url: string, options?: object): Promise<any> {
    if (!this.authToken) { throw new Error('Authenticate first!'); }

    return this.client.get(url, options).then((result) => {
      if (result.data.status !== 200) {
        console.log(result);
        throw new Error('Error while getting results');
      }
      return result.data;
    });
  }
}

export { TinderClient };
