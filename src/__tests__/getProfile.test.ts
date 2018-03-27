import * as nock from 'nock';

import TinderClient from '..'; // tslint:disable-line import-name
import { token, id } from './util/getAuth';

const tinderClient = new TinderClient();

beforeAll(() => (
  tinderClient.auth(token, id)
));

nock.load('./src/__tests__/mocks/auth.json');
nock.load('./src/__tests__/mocks/getProfile.json');

it('gets own profile', async () => {
  const profile = await tinderClient.getProfile();
  expect(profile).toMatchSnapshot();
});

nock.load('./src/__tests__/mocks/auth.json');
nock.load('./src/__tests__/mocks/getProfileOther.json');

it('gets profile of someone else', async () => {
  const id = '51d4cc502e7211e8a74c61df';
  const profile = await tinderClient.getProfile(id);
  expect(profile).toMatchSnapshot();
});
