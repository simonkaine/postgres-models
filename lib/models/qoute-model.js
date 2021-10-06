import pool from '../utils/pool.js';

export default class QoutesModel {

  constructor(row) {
    this.id = row.id;
    this.character = row.character;
  }

  static async insert({ character }) {
    const { rows } = await pool.query(
      'INSERT INTO qoutes (character) VALUES ($1) RETURNING *',
      [character]
    );
    console.log('MODEL', rows);
    return new QoutesModel(rows[0]);
  }

  static async getQoute() {
    const { rows } = await pool.query(
      'SELECT * FROM qoutes',
    );
    return rows.map((row) => new QoutesModel(row));
  }

  static async getId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM qoutes WHERE id = $1',
      [id]
    );
    return rows.map((row) => new QoutesModel(row));
  }
}
