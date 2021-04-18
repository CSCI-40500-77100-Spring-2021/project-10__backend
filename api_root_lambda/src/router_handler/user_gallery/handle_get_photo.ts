import { RequestHandler } from 'express';
import Gallery from '../../model/gallery';
import { GetCurrentUser, GetNextPageUri, GetRequestPageOptions } from '../../util/request';

const GetPhotoRequestHandler: RequestHandler = async (req, res, next) => {
  try {
    const pageOption = GetRequestPageOptions(req);
    const { items, nextPageKey } = await Gallery.GetUserGallery(
      req.params.userId,
      pageOption,
    );
    const imagePosts = items.map((entry) => ({
      id: entry.id,
      title: entry.title,
      description: entry.description,
      imageUrl: entry.imageUrl,
      alreadyLiked: entry.likedBy.has(GetCurrentUser()),
      likeCount: entry.likedBy.size,
    }));
    return res.status(200).json({
      result: imagePosts,
      page: {
        next: nextPageKey ? GetNextPageUri(req.path, nextPageKey) : undefined,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export default GetPhotoRequestHandler;
