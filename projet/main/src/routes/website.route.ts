import { Router } from 'express';
import { mainController } from '../controllers/main.controller.js';
import { accesMiddleware } from '../middlewares/access.middleware.js';

export const websiteRouter = Router();

websiteRouter.get('/', mainController.showHomePage);
websiteRouter.route('/register')
  .get(mainController.showRegisterPage)
  .post(mainController.register);
websiteRouter.route('/login')
  .get(mainController.showLoginPage)
  .post(mainController.login);

websiteRouter.get('/admin', accesMiddleware, mainController.showAdminPage);

websiteRouter.use(mainController.showNotFoundPage);
websiteRouter.use(mainController.showErrorPage);