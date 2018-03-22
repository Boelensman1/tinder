import Tinder from '..'; // tslint:disable-line import-name
import { token, id } from './util/getAuth';

const tinder = new Tinder();

it('Authenticate', () => (
  tinder.auth(token, id).then((result) => {
    expect(result).toBe(true);
  })
));
