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
    const formatedPassword = queue.concat('-', lastOfDay);

    const pass = { password_type: formatedPassword };

    const password = await Password.create(pass);

    req.io.emit('broadcast', password);

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

    console.log(called_by);

    const password = await Password.findByIdAndUpdate(
      id,
      {
        called: true,
        called_by,
        place,
      },
      { new: true }
    );

    req.io.emit('sendLastPassword', password);

    return res.json(password);
  }
}

export default new PasswordController();
