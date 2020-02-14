import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: { user_id: req.body.user_id },
    });

    if (userExists) {
      return res.status(400).json({ error: 'user already exists' });
    }

    const { id, name, user_id, admin } = await User.create(req.body);

    return res.json({
      id,
      name,
      user_id,
      admin,
    });
  }

  async update(req, res) {
    const { user_id } = req.body;

    const user = await User.findByPk(req.id);

    if (user_id && user_id !== user.user_id) {
      const userExists = await User.findOne({
        where: { user_id: req.body.user_id },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    const { id, name, admin } = await user.update(req.body);

    return res.json({
      id,
      name,
      user_id,
      admin,
    });
  }
}

export default new UserController();
