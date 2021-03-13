import { Router } from 'express';
import echoRouter from './echo';

const router = Router();

router.use('/echo', echoRouter);

router.route('/').get((_, res) => {
  res.status(200).json({ message: 'Hello World' });
});

export default router;
