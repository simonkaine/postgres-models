import { Router } from 'express';
import CharacterModel from '../models/class-sql.js';
import { fetchedData } from '../utils/fetch-utils.js';

export default Router()


  .post('/', async (req, res, next) => {
    try {
      const fetchData = await fetchedData();
      const data = await CharacterModel.insert(fetchData);
      
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const getData = await CharacterModel.getCharacters();
      res.json(getData[0]);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const dataId = await CharacterModel.getDataId(req.params.id);
      res.json(dataId[0]);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedCharacter = await CharacterModel.patchByID(req.params.id, req.body.name, req.body.status, req.body.species); 
      res.send(updatedCharacter); 
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const updatedCharacter = await CharacterModel.delete(req.params.id);
      res.send(updatedCharacter);
    } catch (err) {
      next(err);
    }
  });
