/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
      return setup(pool);
    });

    it.only('creates/POST to the rick database', () => {
        return request(app)
          .post('/api/character/2').send({
            name: 'Morty Smith', 
            gender: 'Male'
        })
          .then(res => {
            console.log('RESBODY', res.body);
            expect(res.body).toEqual(
              { 
                id: '1',
                name: 'Morty Smith', 
                gender: 'Male'
              }
            );
          });
      });

    afterAll(() => {
        pool.end();
      });
});
