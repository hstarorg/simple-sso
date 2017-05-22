const mysql = require('mysql');
const config = require('../config');

const dbConfig = config.dbConfig;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

class MySqlHelper {
  constructor(pool) {
    this.pool = pool;
  }

  query(sql, params = [], options = { timeout: 30 * 1000 }) {
    return this._getConnection()
      .then(conn => {
        return this.promiseQuery(conn, sql, params, options);
      });
  }

  queryScalar(sql, params, options) {
    return this.query(sql, params, options)
      .then(results => {
        if (results.length === 0) {
          return null;
        }
        return results[0];
      });
  }

  beginTransaction() {
    return this._getConnection()
      .then(conn => {
        conn.isInTransaction = true;
        return new Promise((resolve, reject) => {
          conn.beginTransaction(err => {
            if (err) {
              return reject(err);
            }
            resolve(conn);
          });
        });
      })
  }

  promiseQuery(connection, sql, params = [], options = { timeout: 30 * 1000 }) {
    return new Promise((resolve, reject) => {
      connection.query({
        sql,
        timeout: options.timeout, // 40s
        values: params
      }, (err, results, fields) => {
        if (!connection.isInTransaction) {
          connection.release();
        }
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  _getConnection() {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          return reject(err);
        }
        resolve(connection);
      });
    });
  }
}

module.exports = new MySqlHelper();
