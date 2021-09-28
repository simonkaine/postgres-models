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

  afterAll(() => {
    pool.end();
  });
});
