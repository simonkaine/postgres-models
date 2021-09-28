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
  });
