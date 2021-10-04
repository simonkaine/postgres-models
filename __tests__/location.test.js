/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
      return setup(pool);
    });

    xit('should GET all data back from the location database', async () => {
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

      xit('creates/POST location data to our database', async () => {
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

      xit('gets location by id', async () => {
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
        });  //Math.Floor(Math.random(array.length)) use a random function to grab a random index. add array sub index
      });

      xit('should PATCH an location by id', async () => {
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

      xit('should DELETE a location by id', async () => {
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
