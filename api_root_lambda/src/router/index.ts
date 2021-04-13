import { Router } from 'express';
import echoRouter from './echo';
import meRouter from './me';

const router = Router();

router.use('/echo', echoRouter);
router.use('/me', meRouter);

router.route('/').get((_, res) => {
  res.status(200).json({ message: 'Hello World' });
});

export default router;
