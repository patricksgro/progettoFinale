import Brevo from '@getbrevo/brevo'
import 'dotenv/config'

const brevo = new Brevo.TransactionalEmailsApi()
brevo.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY

const sender = { name: 'PatrickApp', email: 'patricksgro02@gmail.com' }


export async function sendOtpEmail(toEmail, otp) {
    const sendSmtpEmail = {
        sender,
        to: [{ email: toEmail, name: 'Utente' }],
        subject: 'Il tuo codice OTP',
        textContent: `Il tuo codice OTP è ${otp}, valido per 5 minuti.`
    }
    try {

        await brevo.sendTransacEmail(sendSmtpEmail)
        console.log('Email OTP inviata con successo!')

    } catch(err) {
        console.error('Errore durante l\'invio email:', err)
    }
}