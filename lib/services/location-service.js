import LocationModel from '../models/location-sql.js';
import { fetchedData } from '../utils/location-fetch.js';

export default class Service {

  static async getLocationData() {
    const callToGet = await LocationModel.getLocation();
    return callToGet;
  }

  static async createLocationData(body) {
    // eslint-disable-next-line no-constant-condition, no-cond-assign
    if(body = {}) {
      const fetchData = await fetchedData();
      return fetchData.map(item => {
        LocationModel.insert(item);
      });
    }
    return LocationModel.insert(body);
  }

  static async getLocationId(id) {
    const dataId = LocationModel.getId(id);
    return dataId;
  }

  static async patchLocationByID(id, name, type, dimension) {
    const updatedCharacter = await LocationModel.patchByID(id, name, type, dimension);
    return updatedCharacter;
  }

  static async deleteById(id) {
    const deleteId = await LocationModel.delete(id);
    return deleteId;
  }
}

