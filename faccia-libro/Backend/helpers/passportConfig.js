import GoogleStrategy from 'passport-google-oauth20';
import { signJWT } from './jwt.js';
import User from '../models/User.js';

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK_PATH}`,
  },

  async function (accessToken, refreshToken, profile, callback) {
    try {
      // 1️⃣ Cerco l'utente tramite googleId
      let user = await User.findOne({ googleID: profile.id });

      // 2️⃣ Se non esiste, controllo se c'è un utente registrato con la stessa email
      if (!user) {
        user = await User.findOne({ email: profile._json.email });

        if (user) {
          // L'utente esiste già → collego googleId
          user.googleID = profile.id;
          await user.save();
        } else {
          // Utente completamente nuovo → creo l'account
          user = await User.create({
            name: profile._json.given_name,
            surname: profile._json.family_name,
            email: profile._json.email,
            avatar: profile._json.picture,
            googleID: profile.id,
          });
        }
      }

      // 3️⃣ Genero il JWT
      const jwt = await signJWT({ id: user._id });

      // 4️⃣ Passo il JWT al callback di Passport
      callback(null, { jwt });
    } catch (err) {
      callback(err, null);
    }
  }
);

export default googleStrategy;
