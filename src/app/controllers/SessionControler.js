import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { user_id, password } = req.body;

    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name, admin } = user;

    return res.json({
      user: {
        id,
        name,
        user_id,
        password,
        admin,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
