import mysql from 'mysql';
import { config } from '../config';

const dbConfig = config.dbConfig;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

type QueryOptions = {
  timeout?: number;
};

class MySqlHelper {
  constructor(private pool: mysql.Pool) {}

  query(
    sql: string,
    params: any[] = [],
    options: QueryOptions = { timeout: 30 * 1000 },
  ) {
    return this._getConnection().then(conn => {
      return this.promiseQuery(conn, sql, params, options);
    });
  }

  queryScalar(sql: string, params: any[], options?: QueryOptions) {
    return this.query(sql, params, options).then(results => {
      if (results.length === 0) {
        return null;
      }
      return results[0];
    });
  }

  beginTransaction() {
    return this._getConnection().then(conn => {
      (conn as any).isInTransaction = true;
      return new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
          if (err) {
            return reject(err);
          }
          resolve(conn);
        });
      });
    });
  }

  promiseQuery(
    connection: mysql.PoolConnection,
    sql: string,
    params: any[] = [],
    options: QueryOptions = { timeout: 30 * 1000 },
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      connection.query(
        {
          sql,
          timeout: options.timeout, // 40s
          values: params,
        },
        (err, results, fields) => {
          if (!(connection as any).isInTransaction) {
            connection.release();
          }
          if (err) {
            return reject(err);
          }
          resolve(results);
        },
      );
    });
  }

  _getConnection(): Promise<mysql.PoolConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (err, connection) {
        if (err) {
          return reject(err);
        }
        resolve(connection);
      });
    });
  }
}

export const db = new MySqlHelper(pool);
