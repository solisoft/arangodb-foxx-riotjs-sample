'use strict';
const db = require('@arangodb').db;
//const sessions = module.context.collectionName('sessions');
//const users = module.context.collectionName('users');
const sessions = 'sessions';
const users = 'users';

if (!db._collection(sessions)) {
  db._createDocumentCollection(sessions);
}

if (!db._collection(users)) {
  db._createDocumentCollection(users);
}

db._collection(users).ensureIndex({
  type: 'hash',
  fields: ['username'],
  unique: true
});