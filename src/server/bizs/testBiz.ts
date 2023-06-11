import { db, util } from '../utils';
import { SqlManager } from './SqlManager';

export const doNormalLogin = (userInfo: {
  username: string;
  password: string;
}) => {
  return db
    .queryScalar(SqlManager.QUERY_USER_BY_NAME_PWD, [
      userInfo.username,
      util.hashPassword(userInfo.password),
    ])
    .then(user => {
      if (!user) {
        return Promise.reject('登录失败，请检查您的账户/密码');
      }
      return user;
    });
};
