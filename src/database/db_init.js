const fs = require('fs');
const path = require('path');
const DataStore = require('nedb');

const users = new DataStore({ filename: 'users.db', autoload: true });

users.insert({
  userId: 'cccd6980-cfe7-4dc7-aa90-afb03d61bfab', // GUID，用户ID
  username: '',
  password: '',
  displayName: '出来混总会遇上吃货', // string，用户显示名称
  avatarUrl: 'http://tva3.sinaimg.cn/crop.61.15.269.269.1024/005DomB3gw1elc70qswv0j30aw08jmxx.jpg', // string，头像地址
  weiboId: '', // string, weibo ID
  weiboDisplayName: '', // string, weibo昵称
  githubId: '', // string
  githubDisplayName: '', // string
  qqId: '', // string
  qqDisplayName: '', // string
});
