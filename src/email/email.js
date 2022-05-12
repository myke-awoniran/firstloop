const nodemailer = require('nodemailer');
const pug = require('pug');

class Email {
   constructor(user, url) {
      this.to = user.email;
      this.firstName = user.names.first_name;
      this.url = url;
      this.from = process.env.EMAIL_FROM;
   }
   newTransport() {
      return nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
         },
      });
   }
   async send(template, subject) {
      const html = pug.renderFile(
         `${__dirname}/templates/emails/${template}.pug`,
         {
            firstName: this.firstName,
            url: this.url,
            subject,
         }
      );
      const mailOptions = {
         from: this.from,
         to: this.to,
         subject,
         html,
      };
      await this.newTransport().sendMail(mailOptions);
   }
   async sendWelcome() {
      await this.send('welcome', 'welcome to Gobble foods');
   }
   async sendPasswordReset() {
      await this.send(
         'passwordReset',
         'your password reset token (valid for 10 minutes)'
      );
   }
}

module.exports = Email;
