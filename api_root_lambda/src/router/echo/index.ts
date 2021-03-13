import { Router } from 'express';
import echoRouteHandler from './echo.handler';

const router = Router();

router
  .route('/')
  .get(echoRouteHandler)
  .post(echoRouteHandler)
  .patch(echoRouteHandler)
  .delete(echoRouteHandler);

export default router;
