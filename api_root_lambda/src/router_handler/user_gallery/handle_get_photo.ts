import { RequestHandler } from 'express';
import Gallery from '../../model/gallery';
import { UserGalleryPhotoResponse } from '../../model/response/gallery';
import logger from '../../util/logger';
import Pagination, { GalleryPaginationKey } from '../../util/pagination';
import { GetCurrentUser } from '../../util/request';

const GetPhotoRequestHandler: RequestHandler = async (req, res, next) => {
  const TAG = GetPhotoRequestHandler.name;
  try {
    const pageOption = Pagination.GetRequestPageOptions(
      req,
    ) as GalleryPaginationKey;
    const { userId } = req.params;
    logger.info(TAG, `Retrieving photo for user ${userId}`);
    const { items, nextPageKey } = await Gallery.GetUserGallery(
      userId,
      pageOption,
    );
    const imagePosts: Array<UserGalleryPhotoResponse> = items.map((entry) => ({
      id: entry.id,
      title: entry.title,
      description: entry.description,
      imageUrl: entry.imageUrl,
      alreadyLiked: entry.likedBy.has(GetCurrentUser(req)),
      likeCount: entry.likedBy.size,
    }));
    return res.status(200).json({
      result: imagePosts,
      page: {
        next: nextPageKey
          ? `${req.path}?${Pagination.NextPageURIComponent(nextPageKey)}`
          : undefined,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export default GetPhotoRequestHandler;
