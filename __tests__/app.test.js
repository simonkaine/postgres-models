/* eslint-disable indent */
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
// 'Rick Sanchez' 'Alive' 'Human'

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates/POST to our database', () => {
    return request(app)
      .post('/api/character').send({
      name: 'Rick Sanchez', 
      status: 'Alive', 
      species: 'Human'
    })
      .then(res => {
        expect(res.body).toEqual(
          { 
            id: '1',
            name: 'Rick Sanchez', 
            status: 'Alive', 
            species: 'Human'
          }
        );
      });
  });

    it('should GET all data back from the database', async () => {
    await request(app).post('/api/character'); 
    return request(app)
    .get('/api/character').then((res) => {
  
      expect(res.body).toEqual({ 
        id: '1',
        name: 'Rick Sanchez', 
        status: 'Alive', 
        species: 'Human'
      });
    });
  });

  it('should GET newly created character by ID', async () => {
    await request(app).post('/api/character').send({
          id: '1', 
          name: 'Rick Sanchez', 
          status: 'Alive', 
          species: 'Human',
    }); 
    return request(app)
      .get('/api/character/1').then(res => {
  
        expect(res.body).toEqual({ 
          id: '1', 
          name: 'Rick Sanchez', 
          status: 'Alive', 
          species: 'Human',
        });
      });
  });

  it('should PATCH an character by id', async () => {
    await request(app).post('/api/character').send({ 
      id: '1',
      name: 'Rick Sanchez', 
      status: 'Alive', 
      species: 'Human',
     });
    await request(app).patch('/api/character/1').send({
      name: 'Simon Kaine', 
      status: 'Chillen', 
      species: 'Borg',
     });

    return request(app)
      .get('/api/character/1')
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          name: 'Simon Kaine', 
          status: 'Chillen', 
          species: 'Borg',
        });
      });
  });  

  it('should DELETE a character by id', async () => {
    await request(app).post('/api/character').send({           
      id: '1',
      name: 'Simon Kaine', 
      status: 'Chillen', 
      species: 'Borg', 
    });
    return request(app)
      .delete('/api/character/1')
      .then(res => {
        expect(res.body).toEqual({});
      });
  });

  afterAll(() => {
    pool.end();
  });
});
