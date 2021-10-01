import pool from '../utils/pool.js';

export default class CharacterModel {

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.status = row.status;
    this.species = row.species;
  }

  // SQL to insert new records into the table 
  static async insert({ name, status, species }) {
    const { rows } = await pool.query(
      'INSERT INTO characters (name, status, species) VALUES ($1, $2, $3) RETURNING *',
      [name, status, species]
    );
    return new CharacterModel(rows[0]);
  }
    
  // Get character data from SQL row
  static async getCharacters() {
    const { rows } = await pool.query(
      'SELECT * FROM characters',
    );
    return rows.map((row) => new CharacterModel(row));
  }

  static async getDataId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM characters WHERE id = $1',
      [id]
    );
    return rows.map((row) => new CharacterModel(row));
    
  }

  static async patchByID(id, name, status, species) {
    const { rows } = await pool.query(
      `UPDATE characters
       SET name = $2, status = $3, species = $4
       WHERE id = $1 
       RETURNING *;`,
      [id, name, status, species]
    );
    return new CharacterModel(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
       FROM characters 
       WHERE id = $1 
       RETURNING *;`,
      [id]
    );
    console.log('MODEL DELETE >>>>', rows);
    return new CharacterModel(rows);
  }
}

