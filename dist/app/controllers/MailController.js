"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class MailController {
  async store(req, res) {
    const { name, tel, email, subject, message } = req.body;

    let destinatario = '';

    if (subject === 'DÚVIDA') {
      destinatario = 'antonioosobral@poli.ufrj.br';
    } else {
      destinatario = 'direcaosobral@gmail.com';
    }

    await _Mail2.default.sendMail({
      to: destinatario,
      subject: `${subject}`,
      template: 'contact',
      context: {
        name,
        tel,
        email,
        subject,
        message,
      },
    });

    return res.json({ message: 'E-mail was sent.' });
  }
}

exports. default = new MailController();
