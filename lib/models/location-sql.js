import pool from '../utils/pool.js';

export default class LocationModel {

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.dimension = row.dimension;
  }

  static async getLocation() {
    const { rows } = await pool.query(
      'SELECT * FROM locations',
    );
    return rows.map((row) => new LocationModel(row));
  }

  static async insert({ name, type, dimension }) {
    const { rows } = await pool.query(
      'INSERT INTO locations (name, type, dimension) VALUES ($1, $2, $3) RETURNING *',
      [name, type, dimension]
    );
    return new LocationModel(rows[0]);
  }

}
