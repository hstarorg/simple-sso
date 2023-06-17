import { db, util } from '../utils';
import { SqlManager } from './SqlManager';

/**
 * 查询用户信息
 * @param unionId
 */
export const getUserInfo = (unionId: string) => {
  return db
    .queryScalar(SqlManager.QUERY_USER_INFO_BY_ID, [unionId])
    .then(user => {
      return user;
    });
};
