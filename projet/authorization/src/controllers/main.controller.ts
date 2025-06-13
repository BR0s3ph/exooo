import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const mainController = {

  async checkAccess(req: Request, res: Response) {

    if(!req.body.resource) {
      res.status(400).json({ message: 'Resource is required' });
      return;
    }

    if(!req.body.method) {
      res.status(400).json({ message: 'Method is required' });
      return;
    }

    if(!req.headers.authorization) {
      res.status(401).json({ message: 'Authorization header is required' });
      return;
    }
    
    const resource = req.body.resource as string;
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token : BEARER <token>

    let data;
    try {
       data = jwt.decode(token);
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    if(!data || typeof data !== 'object' || !data.roleId) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Ici il faudrait plutot utiliser un service interne de matrice ACL
    if(!data.role && data.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    res.status(200).json({
      access: true,
      message: `Access granted to resource ${resource} for role ${data.role}`,
      roleId: data.roleId
    });
    
  },

  notFoundPage: (req: Request, res: Response) => {
    res.status(404).json({error: 'Page Not Found', statusCode: 404, message: 'The page you are looking for does not exist.'
    });
  },

  errorPage: (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({error: 'Internal Server Error', statusCode: 500, message: 'An unexpected error occurred. Please try again later.'});
  },

}