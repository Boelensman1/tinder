import axios from 'axios';

import { Suggestion, Photo } from '../classes';

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
    if (!this.authToken) { throw new Error('Authenticate first!'); }

    return this.client.get('/user/recs').then((result) => {
      if (result.data.status !== 200) {
        console.log(result);
        throw new Error('Error while getting results');
      }
      return result.data.results.map((result) => (new Suggestion(this, result)));
    });
  }

  /**
   * Get photo stream
   */
  private getPhotoStream(url: string): Promise<any> {
    if (!this.authToken) { throw new Error('Authenticate first!'); }

    return this.client.get(url, { baseURL: null, responseType: 'stream' });
  }
}

export { TinderClient };
