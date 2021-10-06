/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
    beforeEach(() => {
      return setup(pool);
    });

    it('creates/POST to the qoutes database', () => {
        return request(app)
          .post('/api/qoutes').send({
            character: 'Bender',
        })
          .then(res => {
            expect(res.body).toEqual(
              { 
                id: '1',
                character: 'Bender',
              }
            );
          });
      });

      it('should GET all data back from the qoutes database', async () => {
        await request(app).post('/api/qoutes'); 
        return request(app)
        .get('/api/qoutes').then((res) => {
      
          expect(res.body).toEqual(
            { 
              id: '1',
              character: 'Bender',
            }
          );
        }); 
      });

      it('gets qoute by id', async () => {
        await request(app).post('/api/qoutes').send({
            id: '1',
            character: 'Bender',
        });
        return request(app).get('/api/qoutes/1').then(res => {
          expect(res.body).toEqual({
              id: '1',
              character: 'Bender',
          }); 
        });  
      });

      it('should PATCH qoute by id', async () => {
        await request(app).post('/api/qoutes').send({ 
          id: '1',
          character: 'Bender',
         });
        await request(app).patch('/api/qoutes/1').send({
          character: 'Dr Disrespect',
         });
    
        return request(app)
          .get('/api/qoutes/1')
          .then(res => {
            expect(res.body).toEqual({
              id: '1',
              character: 'Dr Disrespect',
            });
          });
      });  

      it('should DELETE a qoute by id', async () => {
        await request(app).post('/api/qoutes').send({           
          id: '1',
          character: 'Dr Disrespect',
        });
        return request(app)
          .delete('/api/qoutes/1')
          .then(res => {
            expect(res.body).toEqual({});
          });
      }); 

    afterAll(() => {
        pool.end();
      });
});
