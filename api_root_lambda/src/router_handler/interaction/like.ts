import { RequestHandler } from 'express';
import PhotoModel from '../../model/photo';
import { GetCurrentUser } from '../../util/request';

const LikeRequestHandler : RequestHandler = async (req, res, next) => {
  try {
    const { userId: ownerUserId, photoId } = req.params;
    const likedByUserId = GetCurrentUser(req);
    await PhotoModel.LikePhoto({
      ownerUserId,
      likedByUserId,
      photoId,
    });
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return next(error);
  }
};

export default LikeRequestHandler;
