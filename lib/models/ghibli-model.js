import pool from '../utils/pool.js';

export default class GhibliModel {

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
  }

  static async insert(title) {
    console.log('MODELLLLL', title);
    const { rows } = await pool.query(
      'INSERT INTO ghibli (title) VALUES ($1) RETURNING *',
      [title]
    );
    
    return new GhibliModel(rows[0]);
  }

  static async getTitle() {
    const { rows } = await pool.query(
      'SELECT * FROM ghibli',
    );
    return rows.map((row) => new GhibliModel(row));
  }

  static async getId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM ghibli WHERE id = $1',
      [id]
    );
    return rows.map((row) => new GhibliModel(row));
  }

  static async patchByID(id, title) {
    const { rows } = await pool.query(
      `UPDATE ghibli
       SET title = $2
       WHERE id = $1 
       RETURNING *;`,
      [id, title]
    );
    return new GhibliModel(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE
         FROM ghibli 
         WHERE id = $1 
         RETURNING *;`,
      [id]
    );
    return new GhibliModel(rows);
  }
}
