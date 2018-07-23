import * as nock from 'nock';

import TinderClient from '..'; // tslint:disable-line import-name
import { token, id } from './util/getAuth';

const tinderClient = new TinderClient();

beforeAll(() => (
  tinderClient.auth(token, id)
));

nock.load('./src/__tests__/mocks/auth.json');
nock.load('./src/__tests__/mocks/getProfileInsta.json');
nock.load('./src/__tests__/mocks/instagramProfile.json');

it('gets profile of someone else', async () => {
  const id = 'ea416ed0759d46a8de58f63a59077499';
  const profile = await tinderClient.getProfile(id);

  const isPublic = await profile.instagram!.isPublic();
  expect(isPublic).toBe(true);
});
