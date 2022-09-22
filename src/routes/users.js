import { Router } from 'express';
const api = Router();
import passport from 'passport';
import User from '../controllers/user.js'

api.post(
    '/register',
    passport.authenticate('register', {
      failureRedirect: '/api/error-page',
    })
  );
  
  //POST - login post user info to authenticate
api.post(
    '/login',
    passport.authenticate('login', {
      failureRedirect: '/api/error-page'
    }),
    (req, res) => {
      res.redirect('/api/register')
    }
  );


export default api