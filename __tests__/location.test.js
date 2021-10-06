/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
      return setup(pool);
    });

    it('creates/POST to our location database', () => {
      return request(app)
        .post('/api/location').send({
          name: 'Earth (C-137)',
          type: 'Planet',
          dimension: 'Dimension C-137'
      })
        .then(res => {
          expect(res.body).toEqual(
            { 
              id: '1',
              name: 'Earth (C-137)',
              type: 'Planet',
              dimension: 'Dimension C-137'
            }
          );
        });
    });

      it('should GET all data back from the location database', async () => {
        await request(app).post('/api/location'); 
        return request(app)
        .get('/api/location').then((res) => {
      
          expect(res.body).toEqual(
            { 
              id: '1',
              name: 'Earth (C-137)',
              type: 'Planet',
              dimension: 'Dimension C-137'
            }
          );
        }); 
      });

      it('gets location by id', async () => {
        await request(app).post('/api/location').send({
          id: '1',
          name: 'Earth (C-137)',
          type: 'Planet',
          dimension: 'Dimension C-137'
        });
        return request(app).get('/api/location/1').then(res => {
          expect(res.body).toEqual({
            id: '1',
            name: 'Earth (C-137)',
            type: 'Planet',
            dimension: 'Dimension C-137'
          }); 
        });  
      });

      it('should PATCH an location by id', async () => {
        await request(app).post('/api/location').send({ 
          id: '1',
          name: 'Earth (C-137)',
          type: 'Planet',
          dimension: 'Dimension C-137'
         });
        await request(app).patch('/api/location/1').send({
          name: 'Atlantis',
          type: 'Sea World',
          dimension: 'Free Willy'
         });
    
        return request(app)
          .get('/api/location/1')
          .then(res => {
            expect(res.body).toEqual({
              id: '1',
              name: 'Atlantis',
              type: 'Sea World',
              dimension: 'Free Willy'
            });
          });
      });  

      it('should DELETE a location by id', async () => {
        await request(app).post('/api/location').send({           
          id: '1',
          name: 'Atlantis',
          type: 'Sea World',
          dimension: 'Free Willy'
        });
        return request(app)
          .delete('/api/location/1')
          .then(res => {
            expect(res.body).toEqual({});
          });
      }); 

    afterAll(() => {
        pool.end();
      });
});
