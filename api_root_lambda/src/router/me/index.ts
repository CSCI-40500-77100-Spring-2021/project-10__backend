import { Router } from 'express';
import AddToMyGalleryRequestHandler from '../../router_handler/user_gallery/add_to_gallery';

const router = Router();

router.route('/gallery/add-entry').post(AddToMyGalleryRequestHandler);

export default router;
