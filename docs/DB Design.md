# DB Design

系统使用MySQL作为存储数据库。

以下是具体的表结构设计：

## 通用用户信息表（UnionUser）

| 字段 | 类型 | 非空 | 默认值 | 描述信息 |
| --- | --- | --- | --- | --- |
| UnionId | int | Y | | 自增主键，通用用户ID |
| UserName | varchar(50) | Y | | 用户名 |
| DisplayName | varchar(50) | Y | | 显示名称 |
| Password | varchar(500) | N | |  用户登录密码，需要加密 |
| IsExternalUser | int | Y | 0 | 是否是外部用户，三方登录用户 |
| AvatarUrl | varchar(500) | N | | 头像地址 |
| EmailAddress | varchar(50) | N | | 邮件地址 |
| PhoneNumber | varchar(50) | N | | 手机号码 |
| UserStatus | varchar(50) | Y | 'Active' | 用户状态，激活(Active)，禁用(InActive) |
| CreateDate | datetime | Y | | 账户创建日期 |

## 用户信息扩展表（UnionUserExt）

| 字段 | 类型 | 非空 | 默认值 | 描述信息 |
| --- | --- | --- | --- | --- |
| Id | int | Y | | 自增主键 |
| UnionId | int | Y | | 关联的通用用户ID |
| Gender | varchar(50) | N | | 性别 |
| Location | varchar(100) | N | | 位置（省市）|
| LastUpdateDate | datetime | Y | | 最后更新时间 |

## 外部用户登录扩展表（ExternalUserExt）

| 字段 | 类型 | 非空 | 默认值 | 描述信息 |
| --- | --- | --- | --- | --- |
| Id | int | Y | | 自增主键 |
| Provider | varchar(50) | Y | | 第三方登录名称 |
| UnionId | int | Y | | 关联的通用用户ID |
| ExternalUserId | varchar(50) | Y | | 外部用户ID |
| CreateDate | datetime | Y | | 创建日期 |

## SSO应用表（SsoApplication）

| 字段 | 类型 | 非空 | 默认值 | 描述信息 |
| --- | --- | --- | --- | --- |
| Id | int | Y | | 自增主键 |
| AppName | varchar(50) | Y | | 应用名称 |
| AppDescription | varchar(2000) | N | | 应用描述信息 |
| AppKey | varchar(50) | Y | | App KEY |
| AppSecret | varchar(500) | N | | App 安全码 |
| CallbackUrl | varchar(500) | Y | | 回调地址 |
| AppStatus | varchar(50) | Y | | 应用状态 |
| CreateBy | int | Y | | 创建人 |
| CreateDate | datetime | Y | | 创建日期 |
