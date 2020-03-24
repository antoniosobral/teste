"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _datefns = require('date-fns');

var _Password = require('../schemas/Password'); var _Password2 = _interopRequireDefault(_Password);

class PasswordController {
  async store(req, res) {
    const start = _datefns.startOfToday.call(void 0, );
    const end = _datefns.endOfToday.call(void 0, );

    const passwords = await _Password2.default.find({
      createdAt: { $gte: start, $lt: end },
    });

    const lastOfDay = passwords.length + 1;

    const { queue } = req.body;

    let prefix = '';

    if (queue === 'comum') {
      prefix = 'C';
    }
    if (queue === 'priority') {
      prefix = 'P';
    }
    if (queue === 'results') {
      prefix = 'R';
    }
    if (queue === 'pendencies') {
      prefix = 'M';
    }
    if (queue === 'budgets') {
      prefix = 'O';
    }
    const formatedPassword = prefix.concat('-', lastOfDay);

    const pass = { password_type: formatedPassword, queue };

    const password = await _Password2.default.create(pass);

    return res.json(password);
  }

  async index(req, res) {
    const start = _datefns.startOfToday.call(void 0, );
    const end = _datefns.endOfToday.call(void 0, );

    const passwords = await _Password2.default.find({
      createdAt: { $gte: start, $lt: end },
    });

    return res.json(passwords);
  }

  async update(req, res) {
    const { place, id, called_by } = req.query;

    const password = await _Password2.default.findByIdAndUpdate(
      id,
      {
        called: true,
        called_by,
        place,
      },
      { new: true }
    );
    req.io.emit('lastPasswordTv', password);
    return res.json(password);
  }
}

exports. default = new PasswordController();
