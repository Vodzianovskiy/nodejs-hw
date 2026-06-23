import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const info = await transporter.sendMail(options);

    console.log('MAIL_INFO:', info);
    return info;
  } catch (error) {
    console.error('SendMail error:', error);
    throw error;
  }
};
</write_to_file>
<task_progress>
- [x] Исправить resetPasswordSchema (password min: 8)
- [x] Исправить sendMail.js (переименовать в sendEmail, сигнатура options)
- [ ] Исправить authController.js (импорт sendEmail, явный from)
- [ ] Исправить saveFileToCloudinary.js (resource_type, unique_filename)
- [ ] Исправить userController.js (returnDocument: 'after')
- [ ] Commit + push
</task_progress>
</write_to_file>