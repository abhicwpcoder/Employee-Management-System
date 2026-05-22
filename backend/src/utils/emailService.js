// This is a mock email service - in production, use nodemailer or a real email service
export const sendEmail = async (to, subject, text) => {
  console.log(`Sending email to ${to}:`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${text}`);
  return true;
};

export const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to Employee Management System';
  const text = `Hello ${name},\n\nYour account has been created successfully. You can now login to the system.\n\nRegards,\nEMS Team`;
  return await sendEmail(email, subject, text);
};