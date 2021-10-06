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

      it('should GET all the ghibli data back from the database', async () => {
        await request(app).post('/films'); 
        return request(app)
        .get('/films').then((res) => {
          expect(res.body).toEqual({ 
            id: '1',
            title: 'Castle in the Sky',
          });
        });
      });

    afterAll(() => {
        pool.end();
      });
});
