import nodemailer from "nodemailer"

export const emailRegister = async (data) => {
  console.log("DATA", data)
  const { email, name, token } = data

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5f8b6a4e21a1e7",
      pass: "e288ed2233d6ca"
    }
  });

  // Email information

  const info = await transport.sendMail({
    from: '"UpTask - Project Manager " <accounts@uptask.com>',
    to: email,
    subject: "Uptask - Account Confirmation",
    text: "Uptask Account Confirmation",
    html: `<p>Hello: ${name} Confirm your UpTask account</p>
    <p>Your account is already done, you just need to confirmed in the following link:
      <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Account</a>
    </p>
    <p>If you note create this account, you can ignore this email</p>

    `
  })

}