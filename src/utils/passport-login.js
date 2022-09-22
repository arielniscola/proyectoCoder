import localPassport from 'passport-local';
const localStrategy = localPassport.Strategy;
import User from '../controllers/user.js';
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
            return done(null, false, {
              message: 'Campos obligarios no ingresados',
            });
          }
          const userRegistered = await User.getUserEmail({ email: email });
          console.log(userRegistered);
          if (userRegistered) {
            return done(null, false, {
              message: 'User already registered',
            });
          }
          const newUser = { nombre, email, password, direccion, edad, foto};
          newUser.password = hashPassword(password);
          await User.addUser(req);

          return done(null, { user: newUser });
        } catch (err) {
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
          const user = await User.findOne({ email: emailUser });

          if (!user) {
            return done(null, false, { message: 'Invalid Credentials' });
          } else {
            const matchPassword = await user.matchPassword(passwordUser);
            if (matchPassword) {
              return done(null, { user, loginStatus: true });
            } else {
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
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.get(id);
    //console.log(user);
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