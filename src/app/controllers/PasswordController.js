import { startOfToday, endOfToday } from 'date-fns';

import Password from '../schemas/Password';

class PasswordController {
  async store(req, res) {
    const start = startOfToday();
    const end = endOfToday();

    const passwords = await Password.find({
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

    const password = await Password.create(pass);

    return res.json(password);
  }

  async index(req, res) {
    const start = startOfToday();
    const end = endOfToday();

    const passwords = await Password.find({
      createdAt: { $gte: start, $lt: end },
    });

    return res.json(passwords);
  }

  async update(req, res) {
    const { place, id, called_by } = req.query;

    const password = await Password.findByIdAndUpdate(
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

export default new PasswordController();
