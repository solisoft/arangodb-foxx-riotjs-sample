'use strict';
const collName ="demousers"
const db = require('@arangodb').db;
const joi = require('joi');
const each = require('underscore').each;
const createRouter = require('@arangodb/foxx/router');
const sessionsMiddleware = require('@arangodb/foxx/sessions');

const router = createRouter();
const collection = db._collection(collName);

const sessions = sessionsMiddleware({
  storage: 'sessions',
  transport: 'cookie'
});

module.context.use(sessions);
module.context.use(router);

var fields = []
var schema = {}

var loadFields = function() {
  
  // r: new row; c: classname; n: name/id; t: type; j: joi validation; l: label; d: data list
  fields = [
    { r: true,  c:"uk-width-1-1", n:"login", t:"string", j: joi.string().email().required(), l:"Email" },
    { r: true,  c:"uk-width-1-2", n:"fn", t:"string", j: joi.string().min(2).max(60).required(), l:"First Name" },
    { r: false, c:"uk-width-1-2", n:"ln", t:"string", j: joi.string().min(2).max(60).required(), l:"Last Name" },
    { r: true,  c:"uk-width-1-2", n:"birthday", t:"date", j: joi.date().format("DD/MM/YYYY").raw().required(), l:"Birthday" },
    { r: false,  c:"uk-width-1-2", n:"role", t:"list", j: joi.string().required(), l:"Role", d: [["admin","Administrator"], ["user","User"]] },
    { r: true,  c:"uk-width-1-1", n:"infos", t:"text", j: joi.string().empty("").default(""), l:"Informations (optional)" }
  ]

  schema = {}
  each(fields, function(f) {
    schema[f.n] = f.j
  })

}

loadFields()

module.context.use(function (req, res, next) {
  const start = Date.now();
  try {
    next();
  } finally {
    console.log(`Handled request in ${Date.now() - start}ms`);
  }
})

router.get('/', function (req, res) {
  if(!req.session.uid) res.throw('unauthorized')
  res.send({ data: db._query("FOR doc IN @@collection RETURN doc", {"@collection": collName})._documents });
})
.description('Returns all objects');

router.get('/:id', function (req, res) {
  if(!req.session.uid) res.throw('unauthorized')
  res.send({fields: fields, data: collection.document(req.pathParams.id) });
})
.description('Returns object within ID');

router.get('/check_form', function (req, res) {
  if(!req.session.uid) res.throw('unauthorized')
    var errors = []
  try {
    errors = joi.validate(JSON.parse(req.queryParams.data), schema, { abortEarly: false }).error.details
  } catch(e) {}
  res.send({errors: errors });
})
.description('Check the form for live validation');

router.get('/fields', function (req, res) {
  if(!req.session.uid) res.throw('unauthorized')
  loadFields()
  res.send({ fields: fields });
})
.description('Get all fields to build form');

router.post('/search', function (req, res) {
  if(!req.session.uid) res.throw('unauthorized')
  res.send({data: db._query("FOR doc IN @@collection RETURN doc", {"@collection": collName })._documents });
})
.body(joi.object({
  term: joi.string().required()
}).required(), 'Search term')
.description('Filter salaries');

router.post('/', function (req, res) {
  if(!req.session.uid) res.throw('unauthorized')
  var data = {}
  each(fields, function(f) {data[f.n] = req.body[f.n]})
  var data = collection.save(data, { waitForSync: true })
  res.send({ success: true, key: data });  
  
})
.body(joi.object(schema), 'data')
.description('Create a new salarie.');

router.post('/:id', function (req, res) {
  if(!req.session.uid) res.throw('unauthorized')
  var salarie = collection.document(req.pathParams.id)
  var data = {}
  each(fields, function(f) {data[f.n] = req.body[f.n]})
  collection.update(salarie, data)
  res.send({ success: true });
})
.body(joi.object(schema), 'data')
.description('Update a salarie.');

router.delete('/:id', function (req, res) {
  if(!req.session.uid) res.throw('unauthorized')
  collection.remove("salaries/"+req.pathParams.id)
  res.send({success: true });
})
.description('delete a salarie.');