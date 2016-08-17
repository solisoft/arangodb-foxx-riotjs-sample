'use strict';
const db = require('@arangodb').db;
const joi = require('joi');
const createAuth = require('@arangodb/foxx/auth');
const createRouter = require('@arangodb/foxx/router');
const sessionsMiddleware = require('@arangodb/foxx/sessions');
const queues = require('@arangodb/foxx/queues');
const request = require('@arangodb/request');
const _ = require('underscore');
const auth = createAuth();
const router = createRouter();
const users = db._collection('users');

const sessions = sessionsMiddleware({
  storage: 'sessions',
  transport: 'cookie'
});
module.context.use(sessions);
module.context.use(router);

// GET whoami
router.get('/whoami', function (req, res) {
  try {
    const user = users.document(req.session.uid);
    res.send({username: user.username, role: user.role});
  } catch (e) {
    res.send({username: null });
  }
})
.description('Returns the currently active username.');

// POST login
router.post('/login', function (req, res) {
  // This may return a user object or null
  const user = users.firstExample({
    username: req.body.username,
    role: 'admin'
  });
  const valid = auth.verify(
    user ? user.authData : {},
    req.body.password
  );
  if (!valid) res.throw('unauthorized');
  // Log the user in
  req.session.uid = user._key;
  var ret = req.sessionStorage.save(req.session);
  res.send({success: true, uid: req.session});
})
.body(joi.object({
  username: joi.string().required(),
  password: joi.string().required()
}).required(), 'Credentials')
.description('Logs a registered user in.');

// POST logout
router.post('/logout', function (req, res) {
  if (req.session.uid) {
    req.session.uid = null;
    req.sessionStorage.save(req.session);
  }
  res.send({success: true});
})
.description('Logs the current user out.');

// POST signup
router.post('/signup', function (req, res) {
  const user = req.body;
  try {
    // Create an authentication hash
    user.authData = auth.create(user.password);
    delete user.password;
    const meta = users.save(user);
    Object.assign(user, meta);
  } catch (e) {
    // Failed to save the user
    // We'll assume the UniqueConstraint has been violated
    res.throw('bad request', 'Username already taken', e);
  }
  // Log the user in
  req.session.uid = user._key;
  req.sessionStorage.save(req.session);
  res.send({success: true});
})
.body(joi.object({
  username: joi.string().required(),
  password: joi.string().required()
}).required(), 'Credentials')
.description('Creates a new user and logs them in.');
