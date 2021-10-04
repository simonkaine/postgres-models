import { Router } from 'express';
import Service from '../services/episode-service.js';

export default Router()
  .get('/', async (req, res, next) => {
    try {
      const getEpisodeData = await Service.getEpisodeData();
      res.json(getEpisodeData);
    } catch (error) {
      next(error);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Service.createEpisodeData(req.body);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const dataId = await Service.getEpisodeId(req.params.id);
      res.send(dataId[0]);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedEpisode = await Service.patchEpisodeByID(req.params.id, req.body.name, req.body.episode);
      res.send(updatedEpisode); 
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const deleteEpisode = await Service.deleteById(req.params.id);
      res.send(deleteEpisode);
    } catch (err) {
      next(err);
    }
  });
