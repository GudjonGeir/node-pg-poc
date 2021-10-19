import { Pool } from 'pg';

interface Data {
  id: number,
  name: string,
  num?: number
}

class TestTableStore {
  private pool: Pool
  
  constructor(pool: Pool) {
    this.pool = pool;
  }

  async insertData(name: string, num?: number): Promise<Data> {
    const { rows } = await this.pool.query('INSERT INTO public.test_table_one(name, number)  VALUES($1, $2) RETURNING *', [name, num])
    console.log('user:', rows[0])
    return {
      id: rows[0].id,
      name: rows[0].name,
      num: rows[0].number,
    };
  };
}

export default TestTableStore
