import BookStore from './bookStore';
import { Pool } from 'pg'
import { BookInsert } from '../models/Book';

describe('bookStore', () => {
  const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    port: 5432,
  });
  const store = new BookStore(pool)

  describe('addBook', () => {

    it('should add a book', async () => {
      const book: BookInsert = {
        name: 'The Fellowship of the Ring',
        publishDate: new Date('1954-06-29T00:00:00.000Z')
      }
      const result = await store.addBook(book);
      expect(result.name).toEqual(book.name);
      expect(result.publishDate?.toISOString())
        .toEqual(book.publishDate?.toISOString());
    });

    it('should add a without publishDate', async () => {
      const book: BookInsert = {
        name: 'The Fellowship of the Ring',
      }
      const result = await store.addBook(book);
      expect(result.name).toEqual(book.name);
      expect(result.publishDate).toEqual(null);
    });

  });
  
  describe('getBook', () => {
    it('should get a book that exists', async () => {
      const book: BookInsert = {
        name: 'The Two Towers',
        publishDate: new Date('1954-11-11T00:00:00.000Z')
      }
      const insertedBook = await store.addBook(book);

      const result = await store.getBook(insertedBook.id);
      expect(result).not.toBeNull()
      expect(result?.name).toEqual(book.name);
      expect(result?.publishDate?.toISOString())
        .toEqual(book.publishDate?.toISOString());
    });

    it('should return null if book does not exist', async () => {
      const result = await store.getBook(-1);
      expect(result).toBeNull()
    });

  })


  afterAll(() => {
    pool.end();
  });
});
