import pool from '../utils/pool.js';

export default class LocationModel {

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
  }

  static async insert({ title }) {
    const { rows } = await pool.query(
      'INSERT INTO ghibli (title) VALUES ($1) RETURNING *',
      [title]
    );
    return new LocationModel(rows[0]);
  }
}
