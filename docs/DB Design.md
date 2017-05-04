# DB Design

系统暂定先使用NEDB作为本地数据库，所以暂时不支持cluster模式

## Basic User Info

```
{
  _id: ObjectId,
  username: string,
  password: string,
  displayName: string,
  avatarUrl: string,
  email: string,
  createDate: long,
  github: {},
  weibo: {}
}
```
