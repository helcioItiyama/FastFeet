import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverController from './app/controllers/DeliverController';
import SignatureController from './app/controllers/SignatureController';
import DeliveryController from './app/controllers/DeliveryController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableController from './app/controllers/AvailableController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/* === SCHEDULES === */
routes.get('/deliveryman/:id', ScheduleController.list);
routes.get('/deliveryman/:id/delivered', ScheduleController.listDone);
routes.put(
  '/deliveryman/startdelivery/:productId',
  ScheduleController.setDateStart
);
routes.put(
  '/deliveryman/enddelivery/:productId',
  ScheduleController.setDateEnd
);

routes.get('/deliveryman/:id/available', AvailableController.index);

/* === DELIVERY PROBLEMS === */
routes.get('/delivery/problems', DeliveryProblemController.listAll);
routes.get('/delivery/:id/problems', DeliveryProblemController.listOne);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.cancel);

routes.use(authMiddleware);

/* === ADMIN === */
routes.put('/users', UserController.update);

/* === RECIPIENTS === */
routes.get('/recipients', RecipientController.list);
routes.get('/recipients/:id', RecipientController.findOne);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

/* === IMAGES === */
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/signatures', upload.single('file'), SignatureController.store);

/* === DELIVERYMEN === */
routes.get('/delivers', DeliverController.list);
routes.get('/delivers/:id', DeliverController.findOne);
routes.post('/delivers', DeliverController.store);
routes.put('/delivers/:id', DeliverController.update);
routes.delete('/delivers/:id', DeliverController.delete);

/* === DELIVERIES === */
routes.get('/delivery/', DeliveryController.list);
routes.get('/delivery/:id', DeliveryController.findOne);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

export default routes;
