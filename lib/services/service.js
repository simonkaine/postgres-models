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
  //--------

  static async createData(body) { ///<<< req.body
    // eslint-disable-next-line no-constant-condition, no-cond-assign
    if(body = {}) {
      const fetchData = await fetchedData();
      return fetchData.map(item => {
        CharacterModel.insert(item);
      });
    }
    return CharacterModel.insert(body);
  }
  
  //---------
  static async getCharacterById(id) {
    const dataId = await CharacterModel.getDataId(id);
    return dataId;
  }
  //---------
  static async patchCharacterByID(id, name, status, species) {
    const updatedCharacter = await CharacterModel.patchByID(id, name, status, species);
    return updatedCharacter;
  }
  //---------

  static async deleteById(id) {
    const deleteId = await CharacterModel.delete(id);
    return deleteId;
  }
}

