import EpisodeModel from '../models/episode-sql.js';
import { fetchedData } from '../utils/episode-fetch.js';

export default class Service {

  static async getEpisodeData() {
    const callToGet = await EpisodeModel.getEpisode();
    return callToGet;
  }

  static async createEpisodeData(body) {
    // eslint-disable-next-line no-constant-condition, no-cond-assign
    if(body = {}) {
      const fetchData = await fetchedData();
      return fetchData.map(item => {
        EpisodeModel.insert(item);
      });
    }
    return EpisodeModel.insert(body);
  }

  static async getEpisodeId(id) {
    const dataId = EpisodeModel.getId(id);
    return dataId;
  }

  static async patchEpisodeByID(id, name, episode) {
    const updatedEpisode = await EpisodeModel.patchByID(id, name, episode);
    return updatedEpisode;
  }

  static async deleteById(id) {
    const deleteId = await EpisodeModel.delete(id);
    return deleteId;
  }
}

