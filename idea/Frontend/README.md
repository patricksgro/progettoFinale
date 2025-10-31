# 💡 Idea — Social Network MERN

**Idea** è un social network moderno in cui gli utenti possono condividere i propri pensieri, connettersi con altre persone e comunicare in tempo reale.  
L’app integra funzionalità complete di autenticazione, gestione dei post, sistema di amicizie e chat istantanea.

---

## 🚀 Tecnologie principali

**Stack:**  
- MongoDB  
- Express.js  
- React (Vite)  
- Node.js  

**Librerie e strumenti:**  
- **passport** – autenticazione utente  
- **jsonwebtoken (JWT)** – gestione dei token di accesso  
- **bcrypt** – hashing delle password  
- **cloudinary** – upload e gestione immagini  
- **socket.io** – messaggistica in tempo reale  
- **nodemailer** – invio OTP via email durante registrazione/login  
- **joi** – validazione dei dati  
- **helmet** – sicurezza e gestione header HTTP  
- **mongoose** – ODM per MongoDB  

---

## ⚙️ Funzionalità principali

### 👤 Autenticazione
- Registrazione e login con OTP via email  
- Protezione tramite JWT e password hashate  
- Possibilità di eliminare il proprio account  

### 📝 Post
- Creazione, modifica ed eliminazione dei propri post  
- Possibilità di commentare i post degli altri utenti  
- Upload immagini con Cloudinary  

### 🤝 Amicizie
- Invio, accettazione, rifiuto e rimozione richieste di amicizia  
- Lista amici aggiornata in tempo reale  

### 💬 Chat
- Messaggistica istantanea tramite **Socket.io**  
- Notifiche in tempo reale dei nuovi messaggi  

---

## 🧠 Sicurezza
- Header di sicurezza gestiti con **Helmet**  
- Dati sensibili protetti tramite **bcrypt** e **JWT**  
- Validazione dei dati utente con **Joi**

---

## 📷 Anteprima

![Screenshot homepage](idea/Frontend/public/idea-desktop.PNG)
![Screenshot homepage](idea/Frontend/public/idea-mobile.PNG)

## 🖥️ Installazione e avvio

### Frontend
```bash
cd client
npm install
npm run dev

```

### Backend
```bash
cd server
npm install
npm start

```