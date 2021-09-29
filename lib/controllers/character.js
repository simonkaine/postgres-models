import { Router } from 'express';
import Service from '../services/service.js';

export default Router()
  .get('/', async (req, res, next) => {
    try {
      const getData = await Service.getCharacterData();
      res.json(getData);
    } catch (error) {
      next(error);
    }
  })

// POST method
  .post('/', async (req, res, next) => {
    try {
      const data = await Service.createData();
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const dataId = await Service.getCharacterById(req.params.id);
      
      res.json(dataId[0]);
    } catch (err) {
      next(err);
    }
  });
