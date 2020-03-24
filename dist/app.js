"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _socketio = require('socket.io'); var _socketio2 = _interopRequireDefault(_socketio);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
require('./database');

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );

    this.server = _http2.default.Server(this.app);

    this.socket();

    this.middlewares();
    this.routes();
    this.connectedUsers = {};
  }

  socket() {
    this.io = _socketio2.default.call(void 0, this.server);
    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;
      this.connectedUsers[user_id] = socket.id;
      socket.on('updatePasswords', data => {
        this.io.emit('updatePasswords', data);
      });

      socket.on('lastPasswordTv', pass => {
        this.io.emit('lastPasswordTv', pass);
      });
      socket.on('updateRecall', data => {
        this.io.emit('updateRecall', data);
      });
      socket.on('newPassword', password => {
        this.io.emit('newPassword', password);
      });

      console.log(`user connected: ${socket.id}`);

      socket.on('disconnect', () => {
        delete this.connectedUsers[user_id];
        console.log(`User had left  - id: ${socket.id}`);
      });
    });
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, ));
    this.app.use(_express2.default.json());
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;
      next();
    });
  }

  routes() {
    this.app.use(_routes2.default);
  }
}

exports. default = new App().server;
