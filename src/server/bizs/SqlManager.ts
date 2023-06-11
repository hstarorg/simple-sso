export const SqlManager = {
  QUERY_UNION_USER_INFO: `
SELECT t1.*,t3.Gender, t3.Location FROM UnionUser t1
JOIN ExternalUserExt t2 ON t1.UnionId = t2.UnionId
JOIN UnionUserExt t3 ON t1.UnionId = t3.UnionId
WHERE t2.Provider = ? AND ExternalUserId = ?
LIMIT 1;
  `,
  QUERY_UNION_USER_BY_UNION_ID: `
SELECT t1.*, t2.Gender, t2.Location FROM UnionUser t1
JOIN UnionUserExt t2 ON t1.UnionId = t2.UnionId
WHERE t1.UnionId = ?
LIMIT 1;
  `,
  INSERT_UNION_USER: `
INSERT INTO UnionUser(UserName, DisplayName, IsExternalUser, AvatarUrl, EmailAddress, PhoneNumber, CreateDate)
VALUES(?, ?, 1, ?, ?, ?, now());
  `,
  INSERT_UNION_USER_EXT: `
INSERT INTO UnionUserExt(UnionId, Gender, Location, LastUpdateDate)
VALUES(?, ?, ?, now());
  `,
  INSERT_EXTERNAL_USER_EXT: `
INSERT INTO ExternalUserExt(Provider, UnionId, ExternalUserId, CreateDate)
VALUES(?, ?, ?, now());
  `,
  QUERY_USER_INFO_BY_ID: `
SELECT t1.UnionId, t1.UserName, t1.DisplayName, t1.IsExternalUser, t1.AvatarUrl, t1.EmailAddress, t1.PhoneNumber, t1.CreateDate,
t2.Gender, t2.Location, t2.LastUpdateDate
FROM UnionUser t1
LEFT JOIN UnionUserExt t2 ON t1.UnionId = t2.UnionId
WHERE t1.UnionId = ?;
  `,
  QUERY_MY_APP_LIST: `
SELECT Id, AppName, AppDescription, AppKey, AppSecret, CallbackUrl, AppStatus, CreateBy, CreateDate
FROM SsoApplication
WHERE CreateBy = ?;
  `,
  CREATE_SSO_APPLICATION: `
INSERT INTO SsoApplication(AppName, AppDescription, AppKey, AppSecret, CallbackUrl, AppStatus, CreateBy, CreateDate)
VALUES(?, ?, ?, ?, ?, ?, ?, now());
  `,
  UPDATE_SSO_APPLICATION: `
UPDATE SsoApplication
SET AppName = ?, AppDescription = ?, CallbackUrl = ?, AppStatus = ?
WHERE Id = ?;
  `,
  DELETE_SSO_APPLICATION: `
DELETE FROM SsoApplication
WHERE Id = ?;
  `,
  GET_SSO_APPLICATIO_BY_ID: `
SELECT Id, AppName, AppDescription, AppKey, AppSecret, CallbackUrl, AppStatus, CreateBy, CreateDate
FROM SsoApplication
WHERE Id = ?;
  `,
  REFRESH_SSO_APPLICATION_SECRET: `
UPDATE SsoApplication
SET AppSecret = ?
WHERE Id = ?
  `,
  QUERY_APP_BY_KEY: `
SELECT Id, AppName, AppDescription, AppKey, AppSecret, CallbackUrl, AppStatus, CreateBy, CreateDate
FROM SsoApplication t1
WHERE t1.AppKey= ?;
  `,
  QUERY_USER_BY_NAME_PWD: `
SELECT UnionId, UserName, DisplayName, Password, IsExternalUser, AvatarUrl, EmailAddress, PhoneNumber, CreateDate
FROM UnionUser
WHERE UserName = ? AND Password = ?
LIMIT 1;
  `,
  USER_NAME_EXISTS: `
SELECT COUNT(0) AS TotalCount FROM UnionUser t1
WHERE IsExternalUser = 0 AND UserName = ?;
  `,
  CREATE_CUSTOM_USER: `
INSERT INTO UnionUser(UserName, DisplayName, Password, IsExternalUser, AvatarUrl, EmailAddress, PhoneNumber, CreateDate)
VALUES(?, ?, ?, 0, '', '', '', now());
  `,
};
