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
      const data = await Service.createOrder(req.body);
      console.log('POST CREATED data working>>', data);
      res.send(data);
    } catch (err) {
      next(err);
    }
  });
