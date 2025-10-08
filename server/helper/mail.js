const {
  createTransport,
  createTestAccount,
  getTestMessageUrl,
} = require("nodemailer");

const {
  NODE_ENV,
  DEFAULT_MAIL_SENDER,
  EMAIL_USER,
  EMAIL_PASS,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
} = process.env;

async function getTransporter() {
  let transporter;
  if (NODE_ENV !== "production") {
    // Prefer explicit Gmail creds in dev if provided
    if (EMAIL_USER && EMAIL_PASS) {
      transporter = createTransport({
        service: "gmail",
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });
    } else {
      // Fallback to Ethereal test account (no real email sent, preview URL logged)
      const testAccount = await createTestAccount();
      transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }
  } else {
    transporter = createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
  }
  return transporter;
}

exports.sendMail = async (mail) => {
  const payload = { ...mail };
  if (!payload.from) {
    payload.from =
      DEFAULT_MAIL_SENDER || "Support Helpify <no-reply@helpify.local>";
  }
  const transporter = await getTransporter();
  const mailInfo = await transporter.sendMail(payload);
  if (NODE_ENV !== "production") {
    const preview = getTestMessageUrl(mailInfo);
    if (preview) {
      console.log(`Mail Preview URL is ${preview}`);
    }
  }
  return mailInfo;
};
