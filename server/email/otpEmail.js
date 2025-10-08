exports.otpEmail = (firstName, otp) => `
  <div style="font-family:Arial,sans-serif; color:#111">
    <h2>Verify your email</h2>
    <p>Hi ${firstName || "there"},</p>
    <p>Your verification code is:</p>
    <div style="font-size:28px; letter-spacing:6px; font-weight:700; background:#f3f4f6; padding:12px 16px; display:inline-block; border-radius:8px;">
      ${otp}
    </div>
    <p style="margin-top:16px;">This code will expire in 10 minutes.</p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  </div>
`;
