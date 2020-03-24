"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    const userExists = await _User2.default.findOne({
      where: { user_id: req.body.user_id },
    });

    if (userExists) {
      return res.status(400).json({ error: 'user already exists' });
    }

    const { id, name, user_id, admin } = await _User2.default.create(req.body);

    return res.json({
      id,
      name,
      user_id,
      admin,
    });
  }

  async update(req, res) {
    const { user_id } = req.body;

    const user = await _User2.default.findByPk(req.id);

    if (user_id && user_id !== user.user_id) {
      const userExists = await _User2.default.findOne({
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

exports. default = new UserController();
