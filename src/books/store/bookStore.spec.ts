import BookStore from './bookStore';
import { Pool } from 'pg'
import { BookInsert } from '../models/Book';

describe('insertData', () => {
  const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    port: 5432,
  });
  const store = new BookStore(pool)


  it('should insertData', async () => {
    const book: BookInsert = {
      name: 'The Fellowship of the Ring',
      publishDate: new Date('1954-06-29T00:00:00.000Z')
    }
    const result = await store.addBook(book);
    expect(result.name).toEqual(book.name);
    expect(result.publishDate).toEqual(book.publishDate);
  });

  afterAll(() => {
    pool.end();
  });
});
