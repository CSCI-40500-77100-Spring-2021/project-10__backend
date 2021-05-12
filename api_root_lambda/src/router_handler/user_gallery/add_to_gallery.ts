import { RequestHandler } from 'express';
import Gallery from '../../model/gallery';
import { UserGalleryPhotoResponse } from '../../model/response/gallery';
import UploadService from '../../services/upload_service';
import { GetCurrentUser } from '../../util/request';

const AddToMyGalleryRequestHandler: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, encodedImage } = req.body;
    const { previewUrl: imageUrl } = await UploadService.UploadImage(encodedImage);
    const imageSummary = await Gallery.AddToGallery(GetCurrentUser(req), {
      title,
      description,
      imageUrl,
    });
    const response : UserGalleryPhotoResponse = {
      id: imageSummary.id,
      title: imageSummary.title,
      description: imageSummary.description,
      imageUrl: imageSummary.imageUrl,
      alreadyLiked: imageSummary.likedBy.has(GetCurrentUser(req)),
      likeCount: imageSummary.likedBy.size,
    };
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

export default AddToMyGalleryRequestHandler;
