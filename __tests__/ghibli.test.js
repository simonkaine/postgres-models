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

      it('gets ghibli title by id', async () => {
        await request(app).post('/films').send({
            id: '1',
            title: 'Castle in the Sky',
        });
        return request(app).get('/films/1').then(res => {
          expect(res.body).toEqual({
            id: '1',
            title: 'Castle in the Sky',
          }); 
        });  
      });

      it('should PATCH an ghibli by id', async () => {
        await request(app).post('/films').send({ 
            id: '1',
            title: 'Castle in the Sky',
         });
        await request(app).patch('/films/1').send({
            title: 'MORTAL KOMBAT',
         });
    
        return request(app)
          .get('/films/1')
          .then(res => {
            expect(res.body).toEqual({
              id: '1',
              title: 'MORTAL KOMBAT',
            });
          });
      }); 

      it('should DELETE a title by id', async () => {
        await request(app).post('/films').send({           
            id: '1',
            title: 'MORTAL KOMBAT',
        });
        return request(app)
          .delete('/films/1')
          .then(res => {
            expect(res.body).toEqual({});
          });
      }); 

    afterAll(() => {
        pool.end();
      });
});
