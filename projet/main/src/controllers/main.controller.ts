import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const mainController = {
  showHomePage: async (req: Request, res: Response) => {
    const { data: {data: users} } = await axios.get(`${process.env.AUTHENTICATION_SERVICE_URL}/users`);
    res.render('home', {users});
  },

  showNotFoundPage: (req: Request, res: Response) => {
    res.status(404).render('error', { 
      title: 'Page Not Found',
      status: 404,
      message: 'The page you are looking for does not exist.'
    });
  },

  showErrorPage: (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Internal Server Error',
      status: 500,
      message: 'An unexpected error occurred. Please try again later.'
    });
  },

  showRegisterPage: (req: Request, res: Response) => {
    res.render('register');
  },

  register: async (req: Request, res: Response) => {
    const {data: { error }} = await axios.post(`${process.env.AUTHENTICATION_SERVICE_URL}/users`, req.body);
    if (error) {
      res.status(400).render('error', { 
        title: 'Registration Error',
        status: 400,
        message: error.message || 'An error occurred during registration.'
      });
      return;
    }
    res.status(201).redirect('/login');
  },

  showLoginPage: (req: Request, res: Response) => {
    res.render('login');
  },
  login: async (req: Request, res: Response) => {
    const {data: { error, token }} = await axios.post(`${process.env.AUTHENTICATION_SERVICE_URL}/login`, req.body);
    if (error) {
      res.status(400).render('error', { 
        title: 'Login Error',
        status: 400,
        message: error || 'An error occurred during login.'
      });
      return;
    }

    if (!token) {
      res.status(400).render('error', { 
        title: 'Login Error',
        status: 400,
        message: 'No token received. Please try again.'
      });
      return;
    }

    const userData = jwt.decode(token) as { uuid: string, email: string, roleId: number, iat: number, exp: number };

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', expires: new Date(userData.exp*1000)}); // 1 hour expiration

    // Assuming successful login redirects to home page
    res.redirect('/');
  },

  showAdminPage: async (req: Request, res: Response) => {
    res.render('admin');
  },
}