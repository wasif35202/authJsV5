import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);


export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
 await resend.emails.send({
   from: "onboarding@resend.dev",
   to: email,
   subject: "2FA Code",
   text: "Verify your Account",
   html: `<p>Your 2FA code is ${token}</p>`,
 })
}


export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      text: "Verify your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};


export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    text: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });
};
 