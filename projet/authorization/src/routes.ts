import { Router } from 'express';
import { mainController } from './controllers/main.controller.js';

export const router = Router();
router.post('/', mainController.checkAccess);

router.use(mainController.notFoundPage);
router.use(mainController.errorPage);