import pool from '../utils/pool.js';

export default class MortyModel {

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.gender = row.gender;
  }

  static async insert({ name, gender }) {
    const { rows } = await pool.query(
      'INSERT INTO morty (name, gender) VALUES ($1, $2) RETURNING *',
      [name, gender]
    );
    console.log('MODEL', rows);
    return new MortyModel(rows[0]);
  }
}
