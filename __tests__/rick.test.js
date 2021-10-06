/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
      return setup(pool);
    });

    it('creates/POST to the rick database', () => {
        return request(app)
          .post('/api/character/2').send({
            name: 'Morty Smith', 
            gender: 'male'
        })
          .then(res => {
            expect(res.body).toEqual(
              { 
                id: '1',
                name: 'Morty Smith', 
                gender: 'male'
              }
            );
          });
      });

    afterAll(() => {
        pool.end();
      });
});
