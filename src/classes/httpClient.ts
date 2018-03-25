import axios from 'axios';
import { IncomingMessage } from 'http';


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
 * The class handling the connection to the tinder api
 */
class HttpClient {
  /**
   * Handle to the axios client
   */
  private axiosClient: any;

  /**
   * Tinder auth token
   */
  private authToken: string;

  constructor() {
    this.axiosClient = axios.create(clientConfig);
  }

  /**
   * Authenticate to tinder
   */
  public async auth(facebookToken: string, facebookId: string): Promise<true> {
    // send an authentication request to tinder
    const body = { facebook_token: facebookToken, facebook_id: facebookId };
    const result = await this.axiosClient.post('/auth', body);

    this.authToken = result.data.user.api_token;

    // add x-auth token to the axiosClient settings
    this.axiosClient = axios.create({
      ...clientConfig,
      headers: {
        ...clientConfig.headers,
        'X-Auth-Token': this.authToken,
      },
    });

    return true;
  }

  /**
   * Do a get request using the axios axiosClient
   */
  public async doGetRequest(url: string, checkStatus = true, options?: object): Promise<any> {
    if (!this.authToken) { throw new Error('Authenticate first!'); }

    const result = await this.axiosClient.get(url, options);
    if (checkStatus && result.data.status !== 200) {
      console.log(result);
      throw new Error('Error while getting results');
    }
    return result.data;
  }

  /**
   * Do a get request using the axios axiosClient
   */
  public async doPostRequest(
    url: string,
    data = {},
    checkStatus = true,
    options?: object,
  ): Promise<any> {
    if (!this.authToken) { throw new Error('Authenticate first!'); }

    const result = await this.axiosClient.post(url, data, options);
    if (checkStatus && result.data.status !== 200) {
      console.log(result);
      throw new Error('Error while getting results');
    }
    return result.data;
  }
}

export { HttpClient };
