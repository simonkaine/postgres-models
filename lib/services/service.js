import CharacterModel from '../models/class-sql';
import { fetchedData } from '../utils/fetch-utils';

// retrieves fetched RICK AND MORTY data 
// my action >>
// I will export these class services to a model class to store the data 

export default class Service {
  // GET character
  static async getCharacterData() {
    const fetchData = await fetchedData();
    console.log('GET MUNGED API DATA WORKING...', fetchData);
    return fetchData;
  }

  static async createOrder({ name, status, species }) { ///<<< req.body
    const order = await CharacterModel.createTable({ name, status, species });
    return order;
  }
}

