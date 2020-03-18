import mongoose from 'mongoose';

const PasswordSchema = new mongoose.Schema(
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

export default mongoose.model('Passwords', PasswordSchema);
