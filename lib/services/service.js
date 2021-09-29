import CharacterModel from '../models/class-sql.js';
import { fetchedData } from '../utils/fetch-utils.js';

// retrieves fetched RICK AND MORTY data 
// my action >>
// I will export these class services to a model class to store the data 

export default class Service {
  
  static async getCharacterData() {
    const callToGet = await CharacterModel.getCharacters();
    return callToGet;
  }

  static async createData() { ///<<< req.body
    const fetchData = await fetchedData();
    return await fetchData.map(item => {
      
      CharacterModel.insert(item);
    });
  }

  static async getCharacterById(id) {
    const dataId = await CharacterModel.getDataId(id);
    return dataId;
  }
}

