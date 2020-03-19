import 'dotenv/config';
import express from 'express';
import { join, path } from 'path';
import cors from 'cors';
import http from 'http';
import io from 'socket.io';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.app = express();

    this.server = http.Server(this.app);

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
    this.app.use(express.static(`${__dirname}/build/index.html`));
    this.app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
    this.app.post('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
