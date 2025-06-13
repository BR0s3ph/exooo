import { Request, Response, NextFunction } from "express"
import axios from "axios"

export const accesMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (!token) {
    res.status(401).render('error', {
      title: 'Unauthorized',
      status: 401,
      message: 'You must be logged in to access this page.'
    });
    return;
  }
  let authorization;
  try {
    authorization = await axios.post(`${process.env.AUTHORIZATION_SERVICE_URL}`, {
      resource: req.originalUrl,
      method: req.method
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    res.status(403).render('error', {
      title: 'Forbidden',
      status: 403,
      message: 'You do not have permission to access this resource.'
    });
    return;
  }

  if(!authorization.data.access) {
    res.status(403).render('error', {
      title: 'Forbidden',
      status: 403,
      message: 'You do not have permission to access this resource.'
    });
    return;
  }

  next();

}