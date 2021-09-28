import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
// 'Rick Sanchez' 'Alive' 'Human'
describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets munged api data', () => {
    return request(app).get('/api/character').then((res) => {

      expect(res.body).toEqual({
        'name': expect.any(String),
        'status': expect.any(String),
        'species': expect.any(String)
      });
    });
  });

  it('creates/POST a new character in our database', () => {
    return request(app)
      .post('/api/character')
      .send({     
        'name': 'Simon Kaine',
        'status': 'Alive',
        'species': 'Alien Beast and Lord Of All Space and Time', })
      .then(res => {
        console.log('POST TEST RESPONSE BODY', res.body);
        expect(res.body).toEqual({
          'id': '1', // Should i make this one?
          'name': 'Simon Kaine',
          'status': 'Alive',
          'species': 'Alien Beast and Lord Of All Space and Time',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
