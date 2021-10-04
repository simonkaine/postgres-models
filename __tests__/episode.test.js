/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
      return setup(pool);
    });

    it('should GET all data back from the episodes database', async () => {
        await request(app).post('/api/episode'); 
        return request(app)
        .get('/api/episode').then((res) => {
      
          expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining( 
            { 
              'id': expect.any(String),
              'name': expect.any(String),
              'episode': expect.any(String)
            }
          )]));
        });
      });

      it('creates/POST episodes data to our database', async () => {
        await request(app)
          .post('/api/episode').send();
          return request(app).get('/api/episode')
          .then(res => {
            expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining( 
              { 
                'id': expect.any(String),
                'name': expect.any(String),
                'episode': expect.any(String)
              }
            )])); 
          });
      });

      it('gets episode by id', async () => {
        await request(app).post('/api/episode').send({
          id: '1',
          name: 'Pilot',
          episode: 'S01E01'
        });
        return request(app).get('/api/episode/1').then(res => {
          expect(res.body).toEqual({
            id: '1',
            name: 'Pilot',
            episode: 'S01E01'
          }); 
        });  //Math.Floor(Math.random(array.length)) use a random function to grab a random index. add array sub index
      });

      it('should PATCH an episode by id', async () => {
        await request(app).post('/api/episode').send({ 
            id: '1',
            name: 'Pilot',
            episode: 'S01E01'
         });
        await request(app).patch('/api/episode/1').send({
            name: 'BEST EPISODE EVER',
            episode: '68421'
         });
    
        return request(app)
          .get('/api/episode/1')
          .then(res => {
            expect(res.body).toEqual({
              id: '1',
              name: 'BEST EPISODE EVER',
              episode: '68421'
            });
          });
      });  

      it('should DELETE a episode by id', async () => {
        await request(app).post('/api/episode').send({           
            id: '1',
            name: 'BEST EPISODE EVER',
            episode: '68421'
        });
        return request(app)
          .delete('/api/episode/1')
          .then(res => {
            expect(res.body).toEqual({});
          });
      }); 

    afterAll(() => {
        pool.end();
      });
});
