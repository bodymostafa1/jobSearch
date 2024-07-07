import nodemailer from "nodemailer"
import config from 'config';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get('body.mostafa188@gmail.com'),
    pass: config.get('pdfavmapdirzcepw'),
  },
});

export async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: config.get('emailUser'),
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
