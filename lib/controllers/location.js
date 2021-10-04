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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const dataId = await Service.getLocationId(req.params.id);
      //   console.log(dataId[0]);
      res.send(dataId[0]);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedLocation = await Service.patchLocationByID(req.params.id, req.body.name, req.body.type, req.body.dimension);
      res.send(updatedLocation); 
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const deleteLocation = await Service.deleteById(req.params.id);
      res.send(deleteLocation);
    } catch (err) {
      next(err);
    }
  });
