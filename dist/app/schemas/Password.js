"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const PasswordSchema = new _mongoose2.default.Schema(
  {
    password_type: {
      type: String,
      required: true,
    },
    queue: {
      type: String,
      required: true,
      default: '-',
    },
    called_by: {
      type: String,
      required: true,
      default: '-',
    },
    place: {
      type: String,
      required: true,
      default: '-',
    },
    called: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

exports. default = _mongoose2.default.model('Passwords', PasswordSchema);
