import { db, util } from '../utils';
import { SqlManager } from './SqlManager';
import { ProviderType } from '../types';

export const doNormalLogin = async (userInfo: {
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

const buildExternalUser = (user: any, provider: ProviderType): FullUser => {
  let result: FullUser;
  switch (provider) {
    case ProviderType.Github:
      result = {
        id: user.id,
        displayName: user.displayName,
        username: user.username,
        avatarUrl: user._json.avatar_url,
        emailAddress: user._json.email,
        gender: '',
        location: user._json.location,
      };
      break;
    case ProviderType.Weibo:
      let gender = user._json.gender;
      result = {
        id: user.id,
        displayName: user.displayName,
        username: '',
        avatarUrl: user._json.profile_image_url,
        emailAddress: '',
        gender: gender === 'm' ? '男' : gender === 'w' ? '女' : '保密',
        location: user._json.location,
      };
      break;
    case ProviderType.QQ:
      result = {
        id: user.id,
        displayName: user.nickname,
        username: '',
        avatarUrl: user._json.figureurl_qq_2,
        emailAddress: '',
        gender: user._json.gender,
        location: `${user._json.province} ${user._json.city}`,
      };
      break;
  }
  return result;
};

type FullUser = {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string;
  emailAddress: string;
  gender: string;
  location: string;
};

/**
 * 创建一个统一账户
 * @param user
 * @param provider
 * @returns
 */
const createUnionUser = async (user: FullUser, provider: ProviderType) => {
  const conn = await db.beginTransaction();
  try {
    const result = await db.promiseQuery(conn, SqlManager.INSERT_UNION_USER, [
      user.username,
      user.displayName,
      user.avatarUrl,
      user.emailAddress,
      '',
    ]);
    const unionId = (result as any).insertId;
    await Promise.all([
      db.promiseQuery(conn, SqlManager.INSERT_UNION_USER_EXT, [
        unionId,
        user.gender,
        user.location,
      ]),
      db.promiseQuery(conn, SqlManager.INSERT_EXTERNAL_USER_EXT, [
        provider,
        unionId,
        user.id,
      ]),
    ]);
    await new Promise((resolve, reject) => {
      conn.commit(err => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
    return await db.queryScalar(SqlManager.QUERY_UNION_USER_BY_UNION_ID, [
      unionId,
    ]);
  } catch (reason) {
    return new Promise((resolve, reject) => {
      conn.rollback(err => {
        if (err) {
          return reject(err);
        }
        resolve({ hasError: true, error: '关联失败，请重试。' });
      });
    });
  }
};

/**
 * 执行第三方登录
 * @param req
 * @param res
 * @param next
 */
export const doThirdLogin = (req: any, res: any, next: any) => {
  let provider = req.user.provider;
  let externalUser = buildExternalUser(req.user, provider);
  db.queryScalar(SqlManager.QUERY_UNION_USER_INFO, [provider, externalUser.id])
    .then(user => {
      if (user) {
        return Promise.resolve(user);
      }
      return createUnionUser(externalUser, provider);
    })
    .then(result => {
      if (result && result.hasError) {
        return next(result.error);
      }
      req.session.ssoUser = result;
      next();
    })
    .catch(next);
};
