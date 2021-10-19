/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('test_table_one', {
    id: 'id',
    name: { type: 'string', notNull: true, unique: true },
    number: { type: 'int' },
  })
};

exports.down = pgm => {};
