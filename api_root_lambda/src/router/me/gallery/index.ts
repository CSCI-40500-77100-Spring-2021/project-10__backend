import { Router } from 'express';
import AddToMyGalleryRequestHandler from './add_to_gallery.handler';

const router = Router();

router.route('/add-entry')
  .post(AddToMyGalleryRequestHandler);

export default router;
