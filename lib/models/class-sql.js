import pool from '../utils/pool.js';

export default class CharacterModel {

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.status = row.status;
    this.species = row.species;
  }

  // SQL to insert new records into the table 
  static async createTable({ name, status, species }) {
    const { rows } = await pool.query(
      'INSERT INTO characters (name, status, species) VALUES ($1, $2, $3) RETURNING *',
      [name, status, species]
    );
    return new CharacterModel(rows[0]);
  }
    
  // Get character data from SQL row
  //   static async getCharacters() {
  //     const { rows } = await pool.query(
  //       'SELECT * FROM characters',
  //     );
  //     return rows.map((row) => new CharacterModel(row));
  //   }

};
