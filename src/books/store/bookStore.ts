import { Pool } from "pg";
import { Book, BookInsert, BookUpdate } from "../models/Book";

class BookStore {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async addBook(book: BookInsert): Promise<Book> {
    const { rows } = await this.pool.query(
      `
      INSERT INTO books(name, publish_date)
      VALUES($1, $2)
      RETURNING id, name, publish_date
    `,
      [book.name, book.publishDate]
    );
    return {
      id: rows[0].id,
      name: rows[0].name,
      publishDate: rows[0].publish_date,
    };
  }

  async getBook(bookId: number): Promise<Book | null> {
    const { rows } = await this.pool.query(
      `
      SELECT id, name, publish_date
      FROM books
      WHERE id = $1
    `,
      [bookId]
    );
    if (rows.length > 0) {
      return {
        id: rows[0].id,
        name: rows[0].name,
        publishDate: rows[0].publish_date,
      };
    }
    return null;
  }

  async updateBook(book: BookUpdate): Promise<void> {
    const result = await this.pool.query(
      `
      UPDATE books
      SET name = $1,
          publish_date = $2
      WHERE id = $3;
    `,
      [book.name, book.publishDate, book.id]
    );
    if (result.rowCount === 0) {
      // TODO: use custom error relevant to domain
      throw new Error(`Book with id ${book.id} not found`);
    }
  }
}

export default BookStore;
