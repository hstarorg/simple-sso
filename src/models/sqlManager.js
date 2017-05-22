module.exports = {
  QUERY_UNION_USER_INFO: `
SELECT t1.* FROM UnionUser t1
JOIN ExternalUserExt t2 ON t1.UnionId = t2.UnionId
WHERE t2.Provider = ? AND ExternalUserId = ?
LIMIT 1
  `,
  INSERT_UNION_USER: `
INSERT INTO UnionUser(UserName, DisplayName, IsExternalUser, AvatarUrl, EmailAddress, PhoneNumber, CreateDate)
VALUES(?, ?, 1, ?, ?, ?, now())
  `,
  INSERT_UNION_USER_EXT: `
INSERT INTO UnionUserExt(UnionId, Gender, Location, LastUpdateDate)
VALUES(?, ?, ?, now())
  `,
  INSERT_EXTERNAL_USER_EXT: `
INSERT INTO ExternalUserExt(Provider, UnionId, ExternalUserId, CreateDate)
VALUES(?, ?, ?, now())
  `
};
