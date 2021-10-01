/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
      return setup(pool);
    });

    it('should GET all data back from the location database', async () => {
        await request(app).post('/api/location'); 
        return request(app)
        .get('/api/location').then((res) => {
      
          expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining( 
            { 
              'id': expect.any(String),
              'name': expect.any(String),
              'type': expect.any(String),
              'dimension': expect.any(String)
            }
          )]));
        });
      });

      it('creates/POST location data to our database', async () => {
        await request(app)
          .post('/api/location').send();
          return request(app).get('/api/location')
          .then(res => {
            expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining( 
              { 
                'id': expect.any(String),
                'name': expect.any(String),
                'type': expect.any(String),
                'dimension': expect.any(String)
              }
            )]));
          });
      });

    afterAll(() => {
        pool.end();
      });
});
