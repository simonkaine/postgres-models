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

  static async getId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM locations WHERE id = $1', [id]
    );
    return rows.map((row) => new LocationModel(row));
  }

  static async patchByID(id, name, type, dimension) {
    const { rows } = await pool.query(
      `UPDATE locations
       SET name = $2, type = $3, dimension = $4
       WHERE id = $1 
       RETURNING *;`,
      [id, name, type, dimension]
    );
    return new LocationModel(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
       FROM locations 
       WHERE id = $1 
       RETURNING *;`,
      [id]
    );
    return new LocationModel(rows);
  }

}
