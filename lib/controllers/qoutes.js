import { Router } from 'express';
import QoutesModel from '../models/qoute-model.js';
import { fetchedData } from '../utils/qoute-fetch.js';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const fetchData = await fetchedData();
      const data = await QoutesModel.insert(fetchData);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const getData = await QoutesModel.getQoute();
      res.json(getData[0]);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const dataId = await QoutesModel.getId(req.params.id);
      res.json(dataId[0]);
    } catch (err) {
      next(err);
    }
  }) 

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedQoute = await QoutesModel.patchByID(req.params.id, req.body.character);
      res.send(updatedQoute); 
    } catch (err) {
      next(err);
    }
  });

