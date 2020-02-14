import 'dotenv/config';
import express from 'express';
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
  }

  socket() {
    this.io = io(this.server, { pingInterval: 4, pingTimeout: 2000 });
    this.io.on('connection', socket => {
      console.log(`We have a new connection - clientId: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log('User had left!');
      });
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      req.io = this.io;
      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
