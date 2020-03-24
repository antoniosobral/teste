"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionControler = require('./app/controllers/SessionControler'); var _SessionControler2 = _interopRequireDefault(_SessionControler);
var _PasswordController = require('./app/controllers/PasswordController'); var _PasswordController2 = _interopRequireDefault(_PasswordController);
var _MailController = require('./app/controllers/MailController'); var _MailController2 = _interopRequireDefault(_MailController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionControler2.default.store);
routes.post('/mail', _MailController2.default.store);

routes.get('/', (req, res) => res.send('ok'));

routes.use(_auth2.default);
routes.post('/passwords', _PasswordController2.default.store);
routes.get('/passwords', _PasswordController2.default.index);
routes.put('/passwords', _PasswordController2.default.update);

routes.put('/users', _UserController2.default.update);

exports. default = routes;
