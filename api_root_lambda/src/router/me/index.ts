import { Router } from 'express';
import galleryRoutes from './gallery';

const router = Router();

router.use('/gallery', galleryRoutes);

export default router;
