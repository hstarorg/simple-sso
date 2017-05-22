CREATE TABLE `UnionUser` (
  `UnionId` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键，通用用户ID',
  `UserName` varchar(50) NOT NULL COMMENT '用户名',
  `DisplayName` varchar(50) NOT NULL COMMENT '显示名称',
  `Password` varchar(500) DEFAULT NULL COMMENT '用户登录密码，需要加密',
  `IsExternalUser` int(11) NOT NULL DEFAULT '0' COMMENT '是否是外部用户，三方登录用户',
  `AvatarUrl` varchar(500) DEFAULT NULL COMMENT '头像地址',
  `EamilAddress` varchar(10) DEFAULT NULL COMMENT '邮件地址',
  `PhoneNumber` varchar(10) DEFAULT NULL COMMENT '手机号码',
  `CreateDate` datetime NOT NULL COMMENT '账户创建日期',
  PRIMARY KEY (`UnionId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `UnionUserExt` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `UnionId` int(11) NOT NULL COMMENT '关联的通用用户ID',
  `Gender` varchar(50) DEFAULT NULL COMMENT '性别',
  `Location` varchar(100) DEFAULT NULL COMMENT '位置（省市）',
  `LastUpdateDate` datetime NOT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `ExternalUserExt` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `Provider` varchar(50) NOT NULL COMMENT '第三方登录名称',
  `UnionId` int(11) NOT NULL COMMENT '关联的通用用户ID',
  `ExternalUserId` varchar(50) NOT NULL COMMENT '外部用户ID',
  `CreateDate` datetime NOT NULL COMMENT '创建日期',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
