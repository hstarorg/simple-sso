const fs = require('fs');
const path = require('path');
const DataStore = require('nedb');

const config = require('./../config');

if (!fs.existsSync(config.dbFolder)) {
  fs.mkdirSync(config.dbFolder);
}

const db = {};

db.users = new DataStore({ filename: path.join(config.dbFolder, 'users.db'), autoload: true });

module.exports = db;
