const db = require('../src/common/db');

test('连接数据库，并查询表数据量', () => {
  expect.assertions(1);
  return db.query('SELECT COUNT(0) FROM UnionUser')
    .then(results => {
      expect(results.length).toBe(1);
    });
});
