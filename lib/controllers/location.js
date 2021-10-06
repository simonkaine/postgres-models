import { Router } from 'express';
import CharacterModel from '../models/class-sql.js';
import LocationModel from '../models/location-sql.js';
import { fetchedData } from '../utils/location-fetch.js';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const fetchData = await fetchedData();
      const data = await LocationModel.insert(fetchData);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const getData = await LocationModel.getLocation();
      res.json(getData[0]);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const dataId = await LocationModel.getId(req.params.id);
      res.send(dataId[0]);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedLocation = await LocationModel.patchByID(req.params.id, req.body.name, req.body.type, req.body.dimension);
      res.send(updatedLocation); 
    } catch (err) {
      next(err);
    }
  });

// .delete('/:id', async (req, res, next) => {
//   try {
//     const deleteLocation = await Service.deleteById(req.params.id);
//     res.send(deleteLocation);
//   } catch (err) {
//     next(err);
//   }
// });
