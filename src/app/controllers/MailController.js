import Mail from '../../lib/Mail';

class MailController {
  async store(req, res) {
    const { name, tel, email, subject, message } = req.body;

    let destinatario = '';

    if (subject === 'DÚVIDA') {
      destinatario = 'antonioosobral@poli.ufrj.br';
    } else {
      destinatario = 'direcaosobral@gmail.com';
    }

    await Mail.sendMail({
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

export default new MailController();
