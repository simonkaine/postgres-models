import { Router } from 'express';
import GhibliModel from '../models/ghibli-model.js';
import { fetchedData } from '../utils/ghibli-fetch.js';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const fetchData = await fetchedData();
      const data = await GhibliModel.insert(fetchData.title);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const getData = await GhibliModel.getTitle();
      res.json(getData[0]);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const dataId = await GhibliModel.getId(req.params.id);
      res.json(dataId[0]);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedTitle = await GhibliModel.patchByID(req.params.id, req.body.title);
      res.send(updatedTitle); 
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const deleteQoute = await GhibliModel.delete(req.params.id);
      res.send(deleteQoute);
    } catch (err) {
      next(err);
    }
  });
