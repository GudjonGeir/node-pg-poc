/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('authors', {
    id: 'id',
    name: { type: 'string', notNull: true },
    date_of_birth: { type: 'timestamp' },
  })

  pgm.createTable('books', {
    id: 'id',
    name: { type: 'string', notNull: true },
    publish_date: { type: 'timestamp' },
  })

  pgm.createTable('book_authors', {
    author_id: { type: 'integer', references: 'authors(id)' },
    book_id: { type: 'integer', references: 'books(id)' },
  }, {
    constraints: {
      primaryKey: ['author_id', 'book_id']
    }
  })
};

