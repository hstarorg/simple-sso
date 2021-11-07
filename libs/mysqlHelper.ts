import mysql from 'mysql';
import { config } from './config';

const dbConfig = config.dbConfig;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

class MySqlHelper {
  query(sql: string, params: unknown[] = [], options = { timeout: 30 * 1000 }) {
    return this.getConnection().then(conn => {
      return this.promiseQuery(conn, sql, params, options);
    });
  }

  queryScalar(sql: string, params: unknown[], options?: any) {
    return this.query(sql, params, options).then(results => {
      if (results.length === 0) {
        return null;
      }
      return results[0];
    });
  }

  beginTransaction() {
    return this.getConnection().then((conn: any) => {
      conn.isInTransaction = true;
      return new Promise((resolve, reject) => {
        conn.beginTransaction((err: Error) => {
          if (err) {
            return reject(err);
          }
          resolve(conn);
        });
      });
    });
  }

  private promiseQuery(
    connection: any,
    sql: string,
    params: unknown[] = [],
    options = { timeout: 30 * 1000 },
  ): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
      connection.query(
        {
          sql,
          timeout: options.timeout, // 40s
          values: params,
        },
        (err: Error, results: unknown[]) => {
          if (!connection.isInTransaction) {
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

  private getConnection() {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err: Error, connection: any) {
        if (err) {
          return reject(err);
        }
        resolve(connection);
      });
    });
  }
}

export const mysqlHelper = new MySqlHelper();
