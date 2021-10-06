import { Router } from 'express';
import MortyModel from '../models/morty-model.js';
import { fetchedData } from '../utils/morty-fetch.js';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const fetchData = await fetchedData();
      const data = await MortyModel.insert(fetchData);
      res.send(data);
    } catch (err) {
      next(err);
    }
  });

