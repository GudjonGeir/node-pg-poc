import { Pool } from 'pg';
import { Book, BookInsert } from '../models/Book';

class BookStore {
  private pool: Pool
  
  constructor(pool: Pool) {
    this.pool = pool;
  }

  async addBook(book: BookInsert): Promise<Book> {
    const { rows } = await this.pool.query(`
      INSERT INTO books(name, publish_date)
      VALUES($1, $2) RETURNING *
    `, [book.name, book.publishDate])
    console.log('book:', rows[0])
    return {
      id: rows[0].id,
      name: rows[0].name,
      publishDate: rows[0].publish_date,
    };
  };
}

export default BookStore
