import { Router } from 'express';
import EpisodeModel from '../models/episode-sql.js';
import { fetchedData } from '../utils/episode-fetch.js';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const fetchData = await fetchedData();
      const data = await EpisodeModel.insert(fetchData);
      res.send(data);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const getEpisodeData = await Service.getEpisodeData();
      res.json(getEpisodeData);
    } catch (error) {
      next(error);
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
