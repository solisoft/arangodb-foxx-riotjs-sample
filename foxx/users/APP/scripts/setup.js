'use strict';
const db = require('@arangodb').db;

if (!db._collection('demousers')) {
  db._createDocumentCollection('demousers');
}
