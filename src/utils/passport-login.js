import localPassport from 'passport-local';
const localStrategy = localPassport.Strategy;
import sendNotification from '../utils/nodemailer.js'
import { logger } from './logger.js';
import { userService } from '../services/user.service.js';
import bcrypt from 'bcrypt';

const passportLoginSetup = (passport) => {

  //REGISTER WITH PASSPORT
  passport.use(
    'register',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { nombre, edad, direccion, foto } = req.body;
        try {
          if (!nombre || !email || !password ) {
            logger.error('error', `Error en el registro de usuario. Ruta: ${req.url}`)
            return done(null, false, {
              message: 'Campos obligarios no ingresados',
            });
          }
          const userRegistered = await userService.getUserMail({ email: email });

          if (userRegistered) {
            logger.error('error', `Usuario a registrar existente. Ruta: ${req.url}`)
            return done(null, false, {
              message: 'User already registered',
            });
          }
          
          const newUser = { nombre, email, password, direccion, edad, foto};
          newUser.password = hashPassword(password);

          const userCreated = await userService.addUser(newUser);

         if(userCreated) {
          sendNotification(`Usuario ${userCreated.name} se ha registrado en el sistema`)
         }

          return done(null, { user: newUser });
        } catch (err) {
          logger.error('error', `Error en el registro de usuario.`)
          return done(err);
        }
      }
    )
  );

  //LOGIN WITH PASSPORT
  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'emailUser',
        passwordField: 'passwordUser',
      },
      async (emailUser, passwordUser, done) => {
        try {
          const user = await userService.getUserMail(emailUser);
          if (!user) {
            logger.error('error', `Usuario inexistente. Ruta: ${req.url}`)
            return done(null, false, { message: 'Invalid Credentials' });
          } else {
            const matchPassword = await isValidPassword(passwordUser, user.password);


            if (matchPassword) {
              return done(null, { user, loginStatus: true });
            } else {
              logger.error('error', `Credenciales inválidas. Ruta: ${req.url}`)
              return done(null, false, { message: 'Invalid Credentials' });
            }
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((req, user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.get(id);
    return done(null, user);
  });
};


function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
    
function isValidPassword(reqPassword, hashedPassword) {
  return bcrypt.compareSync(reqPassword, hashedPassword);
}


export default passportLoginSetup