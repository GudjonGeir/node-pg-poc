import TestTableStore from './node-pg';
import { Pool } from 'pg'

describe('insertData', () => {
  const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    port: 5432,
  });
  const store = new TestTableStore(pool)


  it('should insertData', async () => {
    const result = await store.insertData('theString4', 42);
    expect(result.name).toEqual('theString4');
    expect(result.num).toEqual(42);
  });

  afterAll(() => {
    pool.end();
  });
});
