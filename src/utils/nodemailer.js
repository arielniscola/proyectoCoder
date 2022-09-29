import { createTransport } from "nodemailer";
import config from "../config.js";
const MAIL_ADMIN =  config.mailAdmin;
const subject =  "Registro de usuario";

const sendNotification = async (message) => {
    const transporter = createTransport({
        host: "gmail",
        port: 587,
        auth: {
          user: MAIL_ADMIN,
          pass: "",
        },
      });
      
      const mailOptions = {
        from: "Sistema ecommerce",
        to: MAIL_ADMIN,
        subject,
        html: message,
      };
      
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
      } catch (err) {
        console.log(err);
      }
      
}

export default sendNotification

