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
    console.log('CONTROLLER', req.body);
    try {
      const data = await Service.createData(req.body);
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
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedCharacter = await Service.patchCharacterByID(req.params.id, req.body.name, req.body.status, req.body.species); // <<<<< ADD MORE PARAMS
      res.send(updatedCharacter); // <<<<<<<<<<<<<<<< RES.JSON ????
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const updatedCharacter = await Service.deleteById(req.params.id);
      console.log('DELETE >>', updatedCharacter);
      res.send(updatedCharacter);
    } catch (err) {
      next(err);
    }
  });
