import * as nock from 'nock';
import * as fs from 'fs';

import TinderClient from '..'; // tslint:disable-line import-name
import { token, id } from './util/getAuth';

nock.load('./src/__tests__/mocks/auth.json');
nock.load('./src/__tests__/mocks/getMeta.json');

const tinderClient = new TinderClient();

beforeAll(() => (
  tinderClient.auth(token, id)
));

it('gets meta information', async () => {
  const meta = await tinderClient.getMeta();
  expect(meta).toMatchSnapshot();
});
