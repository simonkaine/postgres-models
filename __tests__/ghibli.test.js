/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
      return setup(pool);
    });

    it('creates/POST to the ghibli database', () => {
        return request(app)
          .post('/films').send({
            title: 'Castle in the Sky',
        })
          .then(res => {
              console.log('RES BODY', res.body);
            expect(res.body).toEqual(
              { 
                id: '1',
                title: 'Castle in the Sky',
              }
            );
          });
      });

    afterAll(() => {
        pool.end();
      });
});
