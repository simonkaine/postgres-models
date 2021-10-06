import { Router } from 'express';
import GhibliModel from '../models/ghibli-model.js';
import { fetchedData } from '../utils/ghibli-fetch.js';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const fetchData = await fetchedData();
      const data = await GhibliModel.insert(fetchData.title);
      console.log('DATA DATA', data);
      
      res.send(data);
    } catch (err) {
      next(err);
    }
  });
