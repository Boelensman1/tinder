import Tinder from '..'; // tslint:disable-line import-name
import { token, id } from './util/getAuth';

const tinder = new Tinder();

beforeAll(() => (
  tinder.auth(token, id)
));

it('gets recommentations', () => (
  tinder.getRecs().then((result) => {
    const util = require('util');
    console.log(util.inspect(result, false, null));

    expect(result).toBeDefined();
  })
));
