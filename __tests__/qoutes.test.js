/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
      return setup(pool);
    });

    it.only('creates/POST to the qoutes database', () => {
        return request(app)
          .post('/api/qoutes').send({
            character: 'Bender',
        })
          .then(res => {
            console.log('RESBODY', res.body);
            expect(res.body).toEqual(
              { 
                id: '1',
                character: 'Bender',
              }
            );
          });
      });

    afterAll(() => {
        pool.end();
      });
});
