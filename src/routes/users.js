import { Router } from 'express';
const api = Router();
import passport from 'passport';

api.post(
    '/register',
    passport.authenticate('register', {
      failureRedirect: '/api/error-page',
    }),(req, res) => {
      res.redirect('/api/home')
    }
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