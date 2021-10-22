import { Pool } from "pg";
import { Author, AuthorInsert, AuthorUpdate } from "../models/Author";
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

  async addAuthor(author: AuthorInsert): Promise<Author> {
    const result = await this.pool.query(
      `
      INSERT INTO authors(name, date_of_birth, bio)
      VALUES($1, $2, $3)
      RETURNING id, name, date_of_birth::text, bio
      `,
      [author.name, author.dateOfBirth, author.bio]
    );
    const { rows } = result;
    return {
      id: rows[0].id,
      name: rows[0].name,
      dateOfBirth: rows[0].date_of_birth,
      bio: rows[0].bio,
    };
  }

  async getAuthor(authorId: number): Promise<Author | null> {
    const { rows } = await this.pool.query(
      `
      SELECT id, name, date_of_birth::text, bio
      FROM authors
      WHERE id = $1
      `,
      [authorId]
    );
    if (rows.length > 0) {
      return {
        id: rows[0].id,
        name: rows[0].name,
        dateOfBirth: rows[0].date_of_birth,
        bio: rows[0].bio,
      };
    }
    return null;
  }

  async updateAuthor(author: AuthorUpdate): Promise<void> {
    const result = await this.pool.query(
      `
      UPDATE authors
      SET name = $1,
          date_of_birth = $2,
          bio = $3
      WHERE id = $4;
      `,
      [author.name, author.dateOfBirth, author.bio, author.id]
    );
    if (result.rowCount === 0) {
      // TODO: use custom error relevant to domain
      throw new Error(`Author with id ${author.id} not found`);
    }
  }
}

export default BookStore;
