import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import 'dotenv/config'


const emailSend = new MailerSend({
    apiKey: process.env.MAILER_API_KEY
})

const sentFrom = new Sender('you@test-z0vklo6wo8vl7qrx.mlsender.net', 'PatrickApp')

export async function sendOtpEmail(toEmail, otp) {
    const recipients = [new Recipient(toEmail, 'Utente')]

    const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('Il tuo codice OTP')
    .setText(`Il tuo codice OTP è ${otp}, valido per 5 minuti`)
    

    await emailSend.email.send(emailParams)
}