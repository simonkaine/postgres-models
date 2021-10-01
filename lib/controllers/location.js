import { Router } from 'express';
import Service from '../services/location-service.js';

export default Router()
  .get('/', async (req, res, next) => {
    try {
      const getData = await Service.getLocationData();
      res.json(getData);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Service.createLocationData(req.body);
      res.send(data);
    } catch (err) {
      next(err);
    }
  });
