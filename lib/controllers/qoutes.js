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
  });

