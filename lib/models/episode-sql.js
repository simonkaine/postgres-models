import pool from '../utils/pool.js';

export default class EpisodeModel {

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.episode = row.episode;
  }

  static async getEpisode() {
    const { rows } = await pool.query(
      'SELECT * FROM episodes',
    );
    return rows.map((row) => new EpisodeModel(row));
  }

  static async insert({ name, episode }) {
    const { rows } = await pool.query(
      'INSERT INTO episodes (name, episode) VALUES ($1, $2) RETURNING *',
      [name, episode]
    );
    return new EpisodeModel(rows[0]);
  }

  static async getId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM episodes WHERE id = $1', [id]
    );
    return rows.map((row) => new EpisodeModel(row));
  }

  static async patchByID(id, name, episode) {
    const { rows } = await pool.query(
      `UPDATE episodes
         SET name = $2, episode = $3
         WHERE id = $1 
         RETURNING *;`,
      [id, name, episode]
    );
    return new EpisodeModel(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
         FROM episodes 
         WHERE id = $1 
         RETURNING *;`,
      [id]
    );
    return new EpisodeModel(rows);
  }

}
