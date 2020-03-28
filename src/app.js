import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import io from 'socket.io';
import routes from './routes';
import './database';

const http = require('http');
const https = require('https');

const fs = require('fs');

class App {
  constructor() {
    this.app = express();

    this.privateKey = fs.readFileSync(
      '/etc/letsencrypt/live/api.labsobral.com.br/privkey.pem',
      'utf8'
    );
    this.certificate = fs.readFileSync(
      '/etc/letsencrypt/live/api.labsobral.com.br/cert.pem',
      'utf8'
    );
    this.ca = fs.readFileSync(
      '/etc/letsencrypt/live/api.labsobral.com.br/chain.pem',
      'utf8'
    );

    this.credentials = {
      key: this.privateKey,
      cert: this.certificate,
      ca: this.ca,
    };

    this.server = https.Server(this.credentials, this.app);

    this.socket();

    this.middlewares();
    this.routes();
    this.connectedUsers = {};
  }

  socket() {
    this.io = io(this.server);
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
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;
      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
