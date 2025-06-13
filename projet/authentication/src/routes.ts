import { Router } from 'express';
import { userController } from './controllers/user.controller.js';
import { mainController } from './controllers/main.controller.js';

export const router = Router();

router.route('/users')
.post(userController.createUser)
.get(userController.getAllUsers);

router.post('/login', userController.login);

router.get('/error', mainController.error);

router.use(mainController.NotFound);
router.use(mainController.InternalServerError);