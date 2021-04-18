import { Router } from 'express';
import LikeRequestHandler from '../router_handler/interaction/like';
import FindUserHandler from '../router_handler/search/find_user';
import GetPhotoRequestHandler from '../router_handler/user_gallery/handle_get_photo';
import echoRouter from './echo';
import meRouter from './me';

const router = Router();

router.use('/echo', echoRouter);
router.use('/me', meRouter);

router
  .route('/user/:userId/photo/:photoId/interaction/like')
  .post(LikeRequestHandler);

router.route('/user/:userId/gallery').get(GetPhotoRequestHandler);

router.route('/search/user')
  .get(FindUserHandler);

router.route('/').get((_, res) => {
  res.status(200).json({ message: 'Welcome to MealSnapAPI Router' });
});

export default router;
